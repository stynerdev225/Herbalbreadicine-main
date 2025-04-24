/**
 * Image Optimization Script
 * Developed by Stiner.dev
 * April 24, 2025
 * 
 * This script optimizes images in your public directory
 * Run with: node image-optimizer.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  imageDir: './public/images',
  outputDir: './public/images/optimized',
  createWebp: true,
  quality: {
    jpeg: 80,
    png: 80,
    webp: 75
  },
  sizes: [
    { width: 320, suffix: 'xs' },
    { width: 640, suffix: 'sm' },
    { width: 1024, suffix: 'md' },
    { width: 1920, suffix: 'lg' }
  ]
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
  console.log(`Created directory: ${config.outputDir}`);
}

// Install required packages if needed
try {
  execSync('npm list sharp || npm install sharp', { stdio: 'inherit' });
  console.log('Image optimization tools are ready');
} catch (error) {
  console.error('Failed to install required packages:', error);
  process.exit(1);
}

// Get a list of image files
const getImageFiles = (dir) => {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
  });
};

// Process images
(async () => {
  try {
    const imageFiles = getImageFiles(config.imageDir);
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Create a report file
    const reportFile = './image-optimization-report.md';
    fs.writeFileSync(reportFile, `# Image Optimization Report\n\nGenerated: ${new Date().toLocaleString()}\n\n`);
    fs.appendFileSync(reportFile, `| Original File | Original Size | Optimized Size | Savings |\n`);
    fs.appendFileSync(reportFile, `|---------------|--------------|----------------|--------|\n`);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    for (const file of imageFiles) {
      const inputPath = path.join(config.imageDir, file);
      const fileStats = fs.statSync(inputPath);
      const originalSize = fileStats.size;
      totalOriginalSize += originalSize;
      
      const fileName = path.basename(file, path.extname(file));
      const fileExt = path.extname(file).toLowerCase();
      
      // Process image at different sizes
      for (const size of config.sizes) {
        try {
          const outputFileName = `${fileName}-${size.suffix}${fileExt}`;
          const outputPath = path.join(config.outputDir, outputFileName);
          
          // Resize and optimize
          let pipeline = sharp(inputPath).resize(size.width);
          
          // Apply proper compression based on file type
          if (fileExt === '.jpg' || fileExt === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: config.quality.jpeg });
          } else if (fileExt === '.png') {
            pipeline = pipeline.png({ quality: config.quality.png });
          }
          
          await pipeline.toFile(outputPath);
          
          // Create WebP version if enabled
          if (config.createWebp) {
            const webpOutputPath = path.join(config.outputDir, `${fileName}-${size.suffix}.webp`);
            await sharp(inputPath)
              .resize(size.width)
              .webp({ quality: config.quality.webp })
              .toFile(webpOutputPath);
          }
          
          // Record optimization results for the main size (md)
          if (size.suffix === 'md') {
            const optimizedStats = fs.statSync(outputPath);
            const optimizedSize = optimizedStats.size;
            totalOptimizedSize += optimizedSize;
            
            const savings = originalSize - optimizedSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(2);
            
            fs.appendFileSync(
              reportFile,
              `| ${file} | ${(originalSize / 1024).toFixed(2)} KB | ${(optimizedSize / 1024).toFixed(2)} KB | ${savingsPercent}% |\n`
            );
          }
        } catch (resizeError) {
          console.error(`Error processing ${file} at size ${size.width}:`, resizeError);
        }
      }
      
      console.log(`Processed: ${file}`);
    }
    
    // Add summary to report
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(2);
    
    fs.appendFileSync(reportFile, `\n## Summary\n\n`);
    fs.appendFileSync(reportFile, `- Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB\n`);
    fs.appendFileSync(reportFile, `- Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB\n`);
    fs.appendFileSync(reportFile, `- Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${totalSavingsPercent}%)\n\n`);
    
    fs.appendFileSync(reportFile, `## Next Steps\n\n`);
    fs.appendFileSync(reportFile, `1. Replace image tags in your HTML with responsive image code:\n\n`);
    fs.appendFileSync(reportFile, "```html\n");
    fs.appendFileSync(reportFile, `<picture>
  <source srcset="/images/optimized/example-xs.webp 320w, /images/optimized/example-sm.webp 640w, /images/optimized/example-md.webp 1024w, /images/optimized/example-lg.webp 1920w" type="image/webp" />
  <source srcset="/images/optimized/example-xs.jpg 320w, /images/optimized/example-sm.jpg 640w, /images/optimized/example-md.jpg 1024w, /images/optimized/example-lg.jpg 1920w" type="image/jpeg" />
  <img src="/images/optimized/example-md.jpg" alt="Description of image" loading="lazy" width="1024" height="768" />
</picture>\n`);
    fs.appendFileSync(reportFile, "```\n\n");
    
    console.log(`\nImage optimization completed!`);
    console.log(`Report saved to: ${reportFile}`);
    
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
})();