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

function normalizeFieldKey(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function flattenPayload(value, prefix, target) {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const nextPrefix = prefix ? prefix + '.' + i : String(i);
      flattenPayload(value[i], nextPrefix, target);
    }
    return;
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const nextPrefix = prefix ? prefix + '.' + key : key;
      flattenPayload(value[key], nextPrefix, target);
    }
    return;
  }

  if (prefix) {
    target[normalizeFieldKey(prefix)] = value;
  }
}

function parseIncomingPayload(e) {
  const rawData = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
  const contentType = e && e.postData && e.postData.type ? String(e.postData.type).toLowerCase() : '';
  const parameterData = e && e.parameter && typeof e.parameter === 'object' ? e.parameter : {};
  let parsedData = {};

  if (typeof rawData === 'string') {
    const trimmed = rawData.trim();

    if (trimmed) {
      if (contentType.indexOf('json') !== -1 || trimmed.charAt(0) === '{' || trimmed.charAt(0) === '[') {
        try {
          parsedData = JSON.parse(trimmed);
        } catch (error) {
          parsedData = {};
        }
      } else if (contentType.indexOf('form') !== -1 || trimmed.indexOf('=') !== -1) {
        const formData = {};
        const pairs = trimmed.split('&');

        for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i];
          if (!pair) {
            continue;
          }

          const separatorIndex = pair.indexOf('=');
          const key = separatorIndex === -1 ? pair : pair.substring(0, separatorIndex);
          const value = separatorIndex === -1 ? '' : pair.substring(separatorIndex + 1);
          formData[decodeURIComponent(key.replace(/\+/g, ' '))] = decodeURIComponent(value.replace(/\+/g, ' '));
        }

        parsedData = formData;
      } else {
        try {
          parsedData = JSON.parse(trimmed);
        } catch (error) {
          parsedData = {};
        }
      }
    }
  } else if (rawData && typeof rawData === 'object') {
    parsedData = rawData;
  }

  const mergedPayload = {};
  const keys = Object.keys(parameterData);
  for (let i = 0; i < keys.length; i++) {
    mergedPayload[keys[i]] = parameterData[keys[i]];
  }

  if (parsedData && typeof parsedData === 'object') {
    const parsedKeys = Object.keys(parsedData);
    for (let i = 0; i < parsedKeys.length; i++) {
      mergedPayload[parsedKeys[i]] = parsedData[parsedKeys[i]];
    }
  }

  const flatPayload = {};
  flattenPayload(mergedPayload, '', flatPayload);

  const nestedKeys = ['data', 'result', 'results', 'payload', 'entry', 'formData', 'values', 'body'];
  for (let i = 0; i < nestedKeys.length; i++) {
    const nestedValue = mergedPayload[nestedKeys[i]];
    if (nestedValue && typeof nestedValue === 'object') {
      flattenPayload(nestedValue, '', flatPayload);
    }
  }

  return flatPayload;
}

function getValueByAliases(payload, aliases) {
  for (let i = 0; i < aliases.length; i++) {
    const key = normalizeFieldKey(aliases[i]);
    const value = payload[key];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }
  return '';
}

function ensureSheetHeaders(sheet, headers) {
  const existingColumns = Math.max(sheet.getLastColumn(), headers.length);
  const existingHeaderRow = sheet.getRange(1, 1, 1, existingColumns).getValues()[0] || [];
  const existingHeaders = [];

  for (let i = 0; i < existingHeaderRow.length; i++) {
    existingHeaders.push(String(existingHeaderRow[i] || '').trim());
  }

  const mergedHeaders = existingHeaders.slice();
  for (let i = 0; i < headers.length; i++) {
    if (mergedHeaders.indexOf(headers[i]) === -1) {
      mergedHeaders.push(headers[i]);
    }
  }

  if (mergedHeaders.length !== existingHeaders.length) {
    sheet.getRange(1, 1, 1, mergedHeaders.length).setValues([mergedHeaders]);
  }

  return mergedHeaders;
}

function serializeValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function doPost(e) {
  try {
    const payload = parseIncomingPayload(e);
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
      'schoolStage',
      'schoolName',
      'courseLanguage',
      'notes',
      'status',
      'siteName'
    ];

    const fieldAliases = {
      timestamp: ['timestamp', 'createdat', 'created_at', 'date', 'submittedat', 'submitted_at'],
      bookingId: ['bookingid', 'booking_id', 'id', 'requestid', 'request_id'],
      parentName: ['parentname', 'parent_name', 'parent', 'fullname', 'name'],
      childName: ['childname', 'child_name', 'studentname', 'student_name', 'child', 'student'],
      childAge: ['childage', 'child_age', 'age', 'studentage', 'student_age'],
      phone: ['phone', 'phonenumber', 'phone_number', 'mobile', 'mobilenumber', 'whatsapp'],
      email: ['email', 'emailaddress', 'email_address'],
      courseId: ['courseid', 'course_id', 'course'],
      courseTitle: ['coursetitle', 'course_title', 'coursename', 'course_name', 'program'],
      deviceType: ['devicetype', 'device_type', 'device'],
      studyMode: ['studymode', 'study_mode', 'mode', 'learningmode'],
      preferredTime: ['preferredtime', 'preferred_time', 'time'],
      schoolStage: ['schoolstage', 'school_stage', 'stage', 'grade', 'gradelevel', 'class', 'schoollevel'],
      schoolName: ['schoolname', 'school_name', 'school'],
      courseLanguage: ['courselanguage', 'course_language', 'language', 'teachinglanguage', 'teaching_language'],
      notes: ['notes', 'note', 'message', 'additionalnotes', 'additional_notes'],
      status: ['status'],
      siteName: ['sitename', 'site_name', 'site']
    };

    const mergedHeaders = ensureSheetHeaders(sheet, headers);
    const rowData = {};

    for (let i = 0; i < mergedHeaders.length; i++) {
      rowData[mergedHeaders[i]] = '';
    }

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      rowData[header] = serializeValue(getValueByAliases(payload, fieldAliases[header] || [header]));
    }

    const row = [];
    for (let i = 0; i < mergedHeaders.length; i++) {
      row.push(rowData[mergedHeaders[i]] || '');
    }

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
