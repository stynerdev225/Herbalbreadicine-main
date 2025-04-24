/**
 * Google Apps Script for Herbal Breadicine Contact Form Submissions
 * Enhanced with better security, rate limiting, and error handling
 * Developed by Stiner.dev - April 24, 2025
 */

// Storage for rate limiting (clears when the script is redeployed)
const RATE_LIMIT_CACHE = CacheService.getScriptCache();
const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds
const MAX_SUBMISSIONS_PER_HOUR = 5; // per IP or email

// Process incoming POST requests
function doPost(e) {
  try {
    // Parse the incoming JSON data from the request
    let data;
    let clientIP = "unknown";
    
    // Get client IP from headers if available
    if (e && e.parameters && e.parameters.userIp) {
      clientIP = e.parameters.userIp;
    }
    
    // Check if we're getting actual POST data
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      // For testing in the script editor
      data = {
        name: "Test User",
        email: "test@example.com",
        message: "This is a test submission"
      };
    }
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return createErrorResponse("Missing required fields", 400);
    }
    
    // Basic email validation
    if (!validateEmail(data.email)) {
      return createErrorResponse("Invalid email format", 400);
    }
    
    // Sanitize inputs to prevent script injection
    data.name = sanitizeInput(data.name);
    data.email = sanitizeInput(data.email);
    data.message = sanitizeInput(data.message);
    
    // Check rate limits
    const isLimited = checkRateLimit(data.email, clientIP);
    if (isLimited) {
      return createErrorResponse("Rate limit exceeded. Please try again later.", 429);
    }
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Submissions') || ss.getActiveSheet();
    
    // Check if headers exist, if not, add them
    if (sheet.getRange('A1').getValue() === '') {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message', 'IP Address']);
    }
    
    // Append the new data to the sheet
    sheet.appendRow([
      new Date().toISOString(),
      data.name,
      data.email,
      data.message,
      clientIP
    ]);
    
    // Send notification email to admin if needed
    try {
      sendNotificationEmail(data);
    } catch (emailError) {
      // Log email error but don't fail the submission
      console.error('Failed to send notification email:', emailError);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Thank you! Your message has been received.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    console.error('Error processing form submission:', error);
    return createErrorResponse('An unexpected error occurred. Please try again later.', 500);
  }
}

// Process incoming GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Herbal Breadicine contact form API is running',
    version: '2.0',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// Function to create standardized error responses
function createErrorResponse(message, code) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: {
      code: code || 500,
      message: message
    }
  })).setMimeType(ContentService.MimeType.JSON);
}

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Input sanitization to prevent script injection
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  // Replace potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Rate limiting function
function checkRateLimit(email, ip) {
  const identifier = email.toLowerCase() + '-' + ip;
  const cacheKey = 'submit_count_' + Utilities.base64Encode(identifier);
  
  // Get current count for this identifier
  let count = RATE_LIMIT_CACHE.get(cacheKey);
  count = count ? parseInt(count, 10) : 0;
  
  // Check if rate limit exceeded
  if (count >= MAX_SUBMISSIONS_PER_HOUR) {
    return true; // Rate limit exceeded
  }
  
  // Increment count and store back in cache
  RATE_LIMIT_CACHE.put(cacheKey, (count + 1).toString(), RATE_LIMIT_WINDOW);
  return false; // Not rate limited
}

// Send notification email to admin
function sendNotificationEmail(data) {
  const adminEmail = 'contact@herbalbreadicine.com'; // Change to your admin email
  const subject = 'New Contact Form Submission';
  const body = `
    New contact form submission:
    
    Name: ${data.name}
    Email: ${data.email}
    
    Message:
    ${data.message}
    
    Received: ${new Date().toLocaleString()}
  `;
  
  GmailApp.sendEmail(adminEmail, subject, body);
}

// Function to test the script directly in the Apps Script editor
function testScript() {
  // This simulates a form submission for testing
  const testData = {
    name: "Test User",
    email: "test@example.com",
    message: "This is a test submission from the Apps Script editor"
  };
  
  // Get the active spreadsheet and sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Submissions') || ss.getActiveSheet();
  
  // Check if headers exist, if not, add them
  if (sheet.getRange('A1').getValue() === '') {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message', 'IP Address']);
  }
  
  // Append the test data to the sheet
  sheet.appendRow([
    new Date().toISOString(),
    testData.name,
    testData.email,
    testData.message,
    'test-ip'
  ]);
  
  Logger.log("Test submission added successfully!");
  return "Test submission added successfully!";
}