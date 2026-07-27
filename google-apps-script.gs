function doGet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const sheetName = PropertiesService.getScriptProperties().getProperty('SHEET_NAME') || 'Bookings';

  return HtmlService.createHtmlOutput(
    `<h1>Virtual Kids School Booking Receiver</h1>
     <p>Spreadsheet ID: ${spreadsheetId || 'not set'}</p>
     <p>Target sheet: ${sheetName}</p>`
  );
}
function getTargetSpreadsheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (error) {
    throw new Error('Set SPREADSHEET_ID in Script Properties or bind this script to the target Google Sheet.');
  }
}

function getTargetSheet(spreadsheet) {
  const sheetName = PropertiesService.getScriptProperties().getProperty('SHEET_NAME') || 'Bookings';
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

function doPost(e) {
  try {
    const rawData = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = typeof rawData === 'string' ? JSON.parse(rawData) : (rawData && typeof rawData === 'object' ? rawData : {});

    const spreadsheet = getTargetSpreadsheet();
    const sheet = getTargetSheet(spreadsheet);

    const headers = [
      'timestamp',
      'bookingId',
      'parentName',
      'childName',
      'childAge',
      'phone',
      'email',
      'courseId',
      'courseTitle',
      'deviceType',
      'studyMode',
      'preferredTime',
      'notes',
      'status',
      'siteName'
    ];

    const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0] || [];
    const hasHeaders = firstRow.some(cell => String(cell).trim() !== '');

    if (!hasHeaders) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    } else if (firstRow.length < headers.length) {
      const paddedHeaders = [...firstRow];
      while (paddedHeaders.length < headers.length) {
        paddedHeaders.push('');
      }
      sheet.getRange(1, 1, 1, paddedHeaders.length).setValues([paddedHeaders]);
    }

    const row = headers.map((key) => data[key] ?? '');
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      spreadsheetId: spreadsheet.getId(),
      sheetName: sheet.getName()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
