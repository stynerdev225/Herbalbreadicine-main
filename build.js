const { execSync } = require('child_process');

// Run the build command
try {
  console.log('Running build process...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}