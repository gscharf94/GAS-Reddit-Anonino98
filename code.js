function myFunction() {
  const contactsFileId = "1fnlcmHpipV1MGbKObcyCJLB_HJmnxmDu8URtXplG0MU";
  const templatesFileId = "1M7taoQWZfUcN4INzj98dcQDAZYWs8zLGIuUJPKrHRNQ";

  let ssContacts = SpreadsheetApp.openById(contactsFileId);
  let ssTemplates = SpreadsheetApp.openById(templatesFileId);

  let sheetContacts = ssContacts.getSheetByName('Sheet1');
  let sheetTemplates = ssTemplates.getSheetByName('Sheet1');

  let contactsArr = sheetContacts.getRange('B3:E10').getValues();
  let templatesArr = sheetTemplates.getRange('B3:C5').getValues();

  let newArr = [
    ['line', 'lastname', 'firstname', 'email', 'template']
  ];

  for (const row of contactsArr) {
    let rowCopy = [...row];
    let currentLineNumber = row[0];
    for (const templateRow of templatesArr) {
      if (currentLineNumber == templateRow[0]) {
        rowCopy.push(templateRow[1]);
        break;
      }
    }
    newArr.push(rowCopy);
  }

  const outputFileId = "11CH1Jd-dnsQPdmY2nZVEa3_iaIa0i-53yfLC3A9hNq4";
  let ssOutput = SpreadsheetApp.openById(outputFileId);
  let sheetOutput = ssOutput.getSheetByName('Sheet1');

  let outputRange = sheetOutput.getRange(`A1:E${newArr.length}`);

  outputRange.setValues(newArr);
}