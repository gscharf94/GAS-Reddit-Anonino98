function myFunction() {
  // note, you should always use const for values that aren't going to change

  const contactsFileId = "1fnlcmHpipV1MGbKObcyCJLB_HJmnxmDu8URtXplG0MU";
  const templatesFileId = "1M7taoQWZfUcN4INzj98dcQDAZYWs8zLGIuUJPKrHRNQ";

  // now with the fileIDs we can access their data using google's SpreadsheetApp object
  // you can find more info about SpreadsheetApp here v
  // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app

  let ssContacts = SpreadsheetApp.openById(contactsFileId);
  let ssTemplates = SpreadsheetApp.openById(templatesFileId);

  // we need to get references to the specific sheet the tables are on
  let sheetContacts = ssContacts.getSheetByName('Sheet1');
  let sheetTemplates = ssTemplates.getSheetByName('Sheet1');

  // we use .getRange() to select the range the tables are in
  // and .getValues() to take the information and output them into an array we can work with
  let contactsArr = sheetContacts.getRange('B3:E10').getValues();
  let templatesArr = sheetTemplates.getRange('B3:C5').getValues();

  // we create the new array which will eventually populate a new spreadsheet
  // the first row we will add a row with headers
  let newArr = [
    ['line', 'lastname', 'firstname', 'email', 'template']
  ];

  // now we will loop through the contactsArr and add a row to newArr for every row in contactsArr
  // in addition, we will find a match for the line number and add the appropriate template tag
  // at the end of the array
  for (const row of contactsArr) {
    // this is just copying the row so we don't mess with the 
    // original arr. (good practice in javascript)
    let rowCopy = [...row];

    // we know now that each row will look like this
    // [1, 'Sharp', 'James', 'james.sharp@email.com']
    // so if we want to find the line number, we can access it
    // by accessing the first element of the arr
    // namely, row[0]
    let currentLineNumber = row[0];

    // now we can loop over the templatesArr until we find a match for the line number
    for (const templateRow of templatesArr) {
      // templateRow looks like
      // [1, 'template 1']
      // so templateRow[0] = line number
      // and templateRow[1] = the template tag
      // so we can do an if statement to test if they are equal
      if (currentLineNumber == templateRow[0]) {
        // if they are equal, we push the template tag
        // to the end of the rowCopy array
        rowCopy.push(templateRow[1]);

        // then we break out of the loop, since we found our match
        break;
      }
    }

    // then we add that rowCopy array to the newArr
    newArr.push(rowCopy);
  }

  const outputFileId = "11CH1Jd-dnsQPdmY2nZVEa3_iaIa0i-53yfLC3A9hNq4";
  let ssOutput = SpreadsheetApp.openById(outputFileId);
  let sheetOutput = ssOutput.getSheetByName('Sheet1');

  // so we just need to select a range in the sheet to place our array data
  // we need to select a range with the exact same dimensions as our array
  // we know our array has 5 columns
  // and we can find out how long our array is by check the
  // array.length attribute

  let outputRange = sheetOutput.getRange(`A1:E${newArr.length}`);

  // once we have the range object, we just use setValues(data) and we're done!
  outputRange.setValues(newArr);
}