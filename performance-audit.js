/**
 * Performance Monitoring Script
 * Developed by Stiner.dev
 * April 24, 2025
 * 
 * This script runs performance audits on your website using Lighthouse
 * Run with: node performance-audit.js <url>
 * Example: node performance-audit.js https://herbalbreadicine.com
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  outputDir: './performance-reports',
  timestamp: new Date().toISOString().replace(/:/g, '-'),
  categories: ['performance', 'accessibility', 'best-practices', 'seo'],
  device: 'mobile' // 'mobile' or 'desktop'
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Parse command line arguments
const url = process.argv[2] || 'http://localhost:5173';

console.log(`Running performance audit on: ${url}`);
console.log(`Device profile: ${config.device}`);

// Install required packages if not already installed
try {
  execSync('npm list -g lighthouse || npm install -g lighthouse puppeteer', { stdio: 'inherit' });
  console.log('Performance testing tools are ready');
} catch (error) {
  console.error('Failed to install required packages:', error);
  process.exit(1);
}

// Pages to test (add more as needed)
const pagesToTest = [
  '',           // Home page
  '/about',
  '/menu',
  '/contact'
];

// Run the performance audits
(async () => {
  try {
    const reportSummaryFile = path.join(config.outputDir, `performance-summary-${config.timestamp}.md`);
    
    fs.writeFileSync(reportSummaryFile, `# Performance Audit Summary\n\nGenerated: ${new Date().toLocaleString()}\n\n`);
    fs.appendFileSync(reportSummaryFile, `| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | FID |\n`);
    fs.appendFileSync(reportSummaryFile, `|------|-------------|---------------|----------------|-----|-----|-----|-----|\n`);
    
    for (const page of pagesToTest) {
      const pageUrl = new URL(page, url).href;
      console.log(`Testing page: ${pageUrl}`);
      
      try {
        const outputFile = path.join(config.outputDir, `lighthouse-${page.replace(/\//g, '-') || 'home'}-${config.timestamp}`);
        
        // Run Lighthouse
        const categoriesArg = config.categories.map(cat => `--only-categories=${cat}`).join(' ');
        const command = `lighthouse "${pageUrl}" --output=json,html --output-path=${outputFile} ${categoriesArg} --preset=${config.device} --quiet`;
        
        execSync(command, { stdio: 'inherit' });
        
        // Parse the JSON results
        const jsonReport = JSON.parse(fs.readFileSync(`${outputFile}.json`, 'utf8'));
        
        // Extract scores
        const scores = {
          performance: (jsonReport.categories.performance?.score * 100).toFixed(0),
          accessibility: (jsonReport.categories.accessibility?.score * 100).toFixed(0),
          bestPractices: (jsonReport.categories['best-practices']?.score * 100).toFixed(0),
          seo: (jsonReport.categories.seo?.score * 100).toFixed(0)
        };
        
        // Extract Core Web Vitals
        const lcp = jsonReport.audits['largest-contentful-paint']?.displayValue || 'N/A';
        const cls = jsonReport.audits['cumulative-layout-shift']?.displayValue || 'N/A';
        const fid = jsonReport.audits['max-potential-fid']?.displayValue || 'N/A';
        
        // Add to summary
        fs.appendFileSync(
          reportSummaryFile,
          `| ${page || 'Home'} | ${scores.performance} | ${scores.accessibility} | ${scores.bestPractices} | ${scores.seo} | ${lcp} | ${cls} | ${fid} |\n`
        );
        
        console.log(`Report for ${pageUrl} saved as ${outputFile}.html`);
      } catch (pageError) {
        console.error(`Error testing page ${pageUrl}:`, pageError.message);
        fs.appendFileSync(reportSummaryFile, `| ${page || 'Home'} | Error | Error | Error | Error | Error | Error | Error |\n`);
      }
    }
    
    // Add recommendations
    fs.appendFileSync(reportSummaryFile, `\n## Performance Optimization Recommendations\n\n`);
    
    fs.appendFileSync(reportSummaryFile, `### Web Vitals Targets\n\n`);
    fs.appendFileSync(reportSummaryFile, `- **LCP (Largest Contentful Paint):** < 2.5s\n`);
    fs.appendFileSync(reportSummaryFile, `- **CLS (Cumulative Layout Shift):** < 0.1\n`);
    fs.appendFileSync(reportSummaryFile, `- **FID (First Input Delay):** < 100ms\n\n`);
    
    fs.appendFileSync(reportSummaryFile, `### Top Performance Optimizations\n\n`);
    fs.appendFileSync(reportSummaryFile, `1. **Image Optimization**\n`);
    fs.appendFileSync(reportSummaryFile, `   - Use WebP images (see image-optimizer.js)\n`);
    fs.appendFileSync(reportSummaryFile, `   - Implement responsive images with srcset\n`);
    fs.appendFileSync(reportSummaryFile, `   - Properly size images to avoid layout shifts\n\n`);
    
    fs.appendFileSync(reportSummaryFile, `2. **JavaScript Optimization**\n`);
    fs.appendFileSync(reportSummaryFile, `   - Use code splitting to reduce initial bundle size\n`);
    fs.appendFileSync(reportSummaryFile, `   - Lazy load non-critical components\n`);
    fs.appendFileSync(reportSummaryFile, `   - Implement tree shaking for unused code\n\n`);
    
    fs.appendFileSync(reportSummaryFile, `3. **CSS Optimization**\n`);
    fs.appendFileSync(reportSummaryFile, `   - Extract critical CSS for above-the-fold content\n`);
    fs.appendFileSync(reportSummaryFile, `   - Remove unused CSS\n`);
    fs.appendFileSync(reportSummaryFile, `   - Minify CSS files\n\n`);
    
    fs.appendFileSync(reportSummaryFile, `4. **Caching and CDN**\n`);
    fs.appendFileSync(reportSummaryFile, `   - Implement proper cache headers\n`);
    fs.appendFileSync(reportSummaryFile, `   - Use a CDN for static assets\n`);
    fs.appendFileSync(reportSummaryFile, `   - Consider implementing a service worker for offline support\n\n`);
    
    console.log(`\nPerformance audit completed!`);
    console.log(`Summary report saved to: ${reportSummaryFile}`);
    
  } catch (error) {
    console.error('Error running performance tests:', error);
  }
})();