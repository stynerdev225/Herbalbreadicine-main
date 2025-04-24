/**
 * Accessibility Audit Script
 * Developed by Stiner.dev
 * April 24, 2025
 * 
 * This script performs a basic accessibility audit on your Herbal Breadicine website
 * Run this with: node accessibility-audit.js <url>
 * Example: node accessibility-audit.js https://herbalbreadicine.com
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  outputDir: './accessibility-reports',
  timestamp: new Date().toISOString().replace(/:/g, '-'),
  validationLevel: 'WCAG2AA' // WCAG2A, WCAG2AA, or WCAG2AAA
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Parse command line arguments
const url = process.argv[2] || 'http://localhost:5173';

console.log(`Running accessibility audit on: ${url}`);
console.log(`Using WCAG compliance level: ${config.validationLevel}`);

// Install required packages if not already installed
try {
  execSync('npm list -g pa11y || npm install -g pa11y puppeteer', { stdio: 'inherit' });
  console.log('Accessibility testing tools are ready');
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

// Run the accessibility tests
(async () => {
  try {
    const outputFile = path.join(config.outputDir, `accessibility-report-${config.timestamp}.md`);
    
    fs.writeFileSync(outputFile, `# Accessibility Audit Report\n\nGenerated: ${new Date().toLocaleString()}\n\n`);
    
    for (const page of pagesToTest) {
      const pageUrl = new URL(page, url).href;
      console.log(`Testing page: ${pageUrl}`);
      
      try {
        const command = `pa11y --standard ${config.validationLevel} --reporter json "${pageUrl}"`;
        const result = execSync(command).toString();
        const issues = JSON.parse(result);
        
        fs.appendFileSync(outputFile, `## Page: ${pageUrl}\n\n`);
        
        if (issues.length === 0) {
          fs.appendFileSync(outputFile, `✅ No accessibility issues found\n\n`);
        } else {
          fs.appendFileSync(outputFile, `⚠️ Found ${issues.length} issues:\n\n`);
          
          issues.forEach((issue, index) => {
            fs.appendFileSync(outputFile, `### Issue ${index + 1}\n\n`);
            fs.appendFileSync(outputFile, `- **Impact:** ${issue.type}\n`);
            fs.appendFileSync(outputFile, `- **Description:** ${issue.message}\n`);
            fs.appendFileSync(outputFile, `- **Code:** \`${issue.selector}\`\n`);
            fs.appendFileSync(outputFile, `- **WCAG Criteria:** ${issue.code}\n\n`);
          });
        }
      } catch (pageError) {
        console.error(`Error testing page ${pageUrl}:`, pageError.message);
        fs.appendFileSync(outputFile, `## Page: ${pageUrl}\n\n`);
        fs.appendFileSync(outputFile, `❌ Error: ${pageError.message}\n\n`);
      }
    }
    
    console.log(`\nAccessibility audit completed!`);
    console.log(`Report saved to: ${outputFile}`);
    
    // Summary of common issues and how to fix them
    fs.appendFileSync(outputFile, `## Common Accessibility Issues and Solutions\n\n`);
    fs.appendFileSync(outputFile, `### 1. Missing Alternative Text\n`);
    fs.appendFileSync(outputFile, `- **Issue:** Images without alt text are not accessible to screen reader users.\n`);
    fs.appendFileSync(outputFile, `- **Solution:** Add descriptive alt text to all images.\n\n`);
    
    fs.appendFileSync(outputFile, `### 2. Low Contrast\n`);
    fs.appendFileSync(outputFile, `- **Issue:** Text with poor contrast is difficult to read for users with visual impairments.\n`);
    fs.appendFileSync(outputFile, `- **Solution:** Ensure text has a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.\n\n`);
    
    fs.appendFileSync(outputFile, `### 3. Missing Form Labels\n`);
    fs.appendFileSync(outputFile, `- **Issue:** Form fields without labels are not properly announced by screen readers.\n`);
    fs.appendFileSync(outputFile, `- **Solution:** Add proper labels to all form fields.\n\n`);
    
    fs.appendFileSync(outputFile, `### 4. Keyboard Navigation\n`);
    fs.appendFileSync(outputFile, `- **Issue:** Elements that can't be accessed via keyboard trap keyboard users.\n`);
    fs.appendFileSync(outputFile, `- **Solution:** Ensure all interactive elements are reachable and operable via keyboard.\n\n`);
  } catch (error) {
    console.error('Error running accessibility tests:', error);
  }
})();