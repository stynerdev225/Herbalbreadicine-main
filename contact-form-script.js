/**
 * Google Apps Script for Herbal Breadicine Contact Form Submissions
 */

// Process incoming POST requests
function doPost(e) {
  try {
    // Parse the incoming JSON data from the request
    let data;
    
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
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
    
    // Check if headers exist, if not, add them
    if (sheet.getRange('A1').getValue() === '') {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append the new data to the sheet
    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || ''
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Form submission saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    console.error('Error processing form submission:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Failed to process submission: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Process incoming GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Contact form submission API is running'
  })).setMimeType(ContentService.MimeType.JSON);
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
  const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
  
  // Check if headers exist, if not, add them
  if (sheet.getRange('A1').getValue() === '') {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
  }
  
  // Append the test data to the sheet
  sheet.appendRow([
    new Date().toISOString(),
    testData.name,
    testData.email,
    testData.message
  ]);
  
  Logger.log("Test submission added successfully!");
  return "Test submission added successfully!";
}