/**
 * Optimized Build Script
 * Developed by Stiner.dev
 * April 24, 2025
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  htmlMinify: true,
  cssMinify: true,
  jsMinify: true,
  imageOptimization: true,
  removeConsoleLog: true,
  addVersioning: true,
  buildDirectory: 'dist'
};

// Helper to log with timestamp
const log = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${message}`);
};

log('Starting enhanced build process...');

// Step 1: Clean existing build directory
try {
  if (fs.existsSync(config.buildDirectory)) {
    log('Cleaning previous build...');
    execSync(`rm -rf ${config.buildDirectory}`);
  }
} catch (error) {
  console.error('Failed to clean directory:', error);
}

// Step 2: Run the base Vite build
try {
  log('Running Vite build with optimizations...');
  execSync('npx vite build --emptyOutDir', { stdio: 'inherit' });
  log('Base build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Step 3: Optimize images if enabled
if (config.imageOptimization) {
  try {
    log('Optimizing images...');
    // Install sharp if not already installed
    execSync('npm list sharp || npm install sharp --no-save', { stdio: 'ignore' });
    
    // Use sharp to optimize PNG and JPG images
    const imageScript = `
      const sharp = require('sharp');
      const fs = require('fs');
      const path = require('path');
      
      const imageDir = path.join('${config.buildDirectory}', 'images');
      if (!fs.existsSync(imageDir)) return;
      
      const files = fs.readdirSync(imageDir);
      
      files.forEach(file => {
        if (file.match(/\\.(png|jpg|jpeg)$/i)) {
          const filePath = path.join(imageDir, file);
          sharp(filePath)
            .jpeg({ quality: 85, progressive: true })
            .toBuffer()
            .then(data => fs.writeFileSync(filePath, data))
            .catch(err => console.error('Error optimizing ' + file, err));
        }
      });
    `;
    
    execSync(`node -e "${imageScript.replace(/\n/g, '')}"`, { stdio: 'inherit' });
    log('Image optimization completed');
  } catch (error) {
    console.error('Image optimization failed:', error);
    // Continue with build even if image optimization fails
  }
}

// Step 4: Remove console.log statements from production JS if enabled
if (config.removeConsoleLog) {
  try {
    log('Removing console.log statements from JS files...');
    execSync('npm list terser || npm install terser --no-save', { stdio: 'ignore' });
    
    const jsScript = `
      const fs = require('fs');
      const path = require('path');
      const { minify } = require('terser');
      
      function processDirectory(directory) {
        const files = fs.readdirSync(directory);
        
        files.forEach(file => {
          const filePath = path.join(directory, file);
          if (fs.statSync(filePath).isDirectory()) {
            processDirectory(filePath);
          } else if (file.endsWith('.js')) {
            const code = fs.readFileSync(filePath, 'utf8');
            minify(code, {
              compress: {
                drop_console: true,
                drop_debugger: true
              }
            }).then(result => {
              fs.writeFileSync(filePath, result.code, 'utf8');
            }).catch(err => {
              console.error('Error processing ' + filePath, err);
            });
          }
        });
      }
      
      processDirectory('${config.buildDirectory}');
    `;
    
    execSync(`node -e "${jsScript.replace(/\n/g, '')}"`, { stdio: 'inherit' });
    log('Console.log statements removed');
  } catch (error) {
    console.error('Removing console.log statements failed:', error);
    // Continue with build even if this step fails
  }
}

// Step 5: Add cache busting version hash to assets if enabled
if (config.addVersioning) {
  try {
    log('Adding version hashes to asset references...');
    const timestamp = Date.now();
    const htmlFiles = fs.readdirSync(config.buildDirectory).filter(file => file.endsWith('.html'));
    
    htmlFiles.forEach(file => {
      const filePath = path.join(config.buildDirectory, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Add version query parameter to CSS and JS files
      content = content.replace(/(href="[^"]+\.css)/g, `$1?v=${timestamp}`);
      content = content.replace(/(src="[^"]+\.js)/g, `$1?v=${timestamp}`);
      
      fs.writeFileSync(filePath, content, 'utf8');
    });
    
    log('Version hashes added to assets');
  } catch (error) {
    console.error('Adding version hashes failed:', error);
    // Continue with build even if this step fails
  }
}

log('Enhanced build process completed successfully!');
log(`The optimized build is available in the '${config.buildDirectory}' directory.`);

// Optional: You can add a step here to automatically deploy to your hosting platform
// For example: execSync('vercel --prod', { stdio: 'inherit' });