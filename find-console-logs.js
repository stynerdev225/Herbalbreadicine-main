/**
 * Console Log Finder Script
 * Developed by Stiner.dev
 * April 24, 2025
 * 
 * This script scans your codebase for console.log statements and generates a report
 * Run this with: node find-console-logs.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sourceDirs: ['./src'],
  outputFile: './console-log-report.md',
  includeExtensions: ['.js', '.jsx', '.ts', '.tsx'],
  excludeDirs: ['node_modules', 'dist', 'build']
};

console.log('Scanning for console.log statements...');

// Create a stream to write results
const outputStream = fs.createWriteStream(config.outputFile);
outputStream.write(`# Console.log Usage Report\n\n`);
outputStream.write(`Generated: ${new Date().toLocaleString()}\n\n`);
outputStream.write(`This report identifies console.log statements in your codebase that should be removed for production.\n\n`);

let totalCount = 0;
let fileCount = 0;

/**
 * Scan a directory recursively for files that match our criteria
 */
function scanDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip excluded directories
      if (entry.isDirectory() && !config.excludeDirs.includes(entry.name)) {
        scanDirectory(fullPath);
        continue;
      }
      
      // Process only files with included extensions
      if (entry.isFile() && config.includeExtensions.includes(path.extname(entry.name))) {
        processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
}

/**
 * Process a single file looking for console.log statements
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const consoleLogLines = [];
    
    lines.forEach((line, index) => {
      if (line.includes('console.log')) {
        consoleLogLines.push({
          lineNumber: index + 1,
          content: line.trim()
        });
      }
    });
    
    if (consoleLogLines.length > 0) {
      fileCount++;
      totalCount += consoleLogLines.length;
      
      // Write file info to report
      outputStream.write(`## ${filePath}\n\n`);
      
      consoleLogLines.forEach(({ lineNumber, content }) => {
        outputStream.write(`- Line ${lineNumber}: \`${content}\`\n`);
      });
      
      outputStream.write('\n');
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Scan each source directory
for (const dir of config.sourceDirs) {
  scanDirectory(dir);
}

// Write summary
outputStream.write(`## Summary\n\n`);
outputStream.write(`- Total console.log statements found: ${totalCount}\n`);
outputStream.write(`- Files with console.log statements: ${fileCount}\n\n`);

outputStream.write(`## Recommendations\n\n`);
outputStream.write(`1. Replace development logs with a proper logger that can be disabled in production\n`);
outputStream.write(`2. Consider using the following pattern for debugging:\n\n`);
outputStream.write("```javascript\n");
outputStream.write("const DEBUG = process.env.NODE_ENV !== 'production';\n");
outputStream.write("function debug(...args) {\n");
outputStream.write("  if (DEBUG) {\n");
outputStream.write("    console.log(...args);\n");
outputStream.write("  }\n");
outputStream.write("}\n");
outputStream.write("```\n\n");
outputStream.write(`3. For errors that should be logged in production, consider using error monitoring services like Sentry\n`);

outputStream.end();

console.log(`Report generated at ${config.outputFile}`);
console.log(`Found ${totalCount} console.log statements in ${fileCount} files`);