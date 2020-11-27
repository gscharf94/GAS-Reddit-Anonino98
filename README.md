# GAS-Reddit-Anonino98

Here is the prompt our friend /u/Anonino98 needed assistance with
> 
> Hello all,
> 
> I need help to make a google app script.
> 
> The final goal of this script is to properly format the data into a third file
> 
> Sheet File 1 (Contact) ![Sheet file 1 (contact)](https://preview.redd.it/4daje3wtyr161.png?width=363&format=png&auto=webp&s=08fd3e78ad1cd61937744ab0c3bc506e5a2bca84)
> 
> Line = subway line
> 
> Sheet File 2 (line update) ![Sheet file 2 (Line update)](https://preview.redd.it/bj929918zr161.png?width=180&format=png&auto=webp&s=56a00ff02cc1010ae398535148e3629996515526)
> 
> Subway line with template
> 
> First, I have to create a third google sheet file, then I have to copy all the data from sheet file 1 into it.
> 
> Second, create a new column called "Template" into the third
> 
> finally, update the column "template" according to the file google sheet 2 this means comparing the "rows" columns of file 3 and 1 and > filling in the template column according to
> 
> ​
> 
> Can u help me please ?

----------------------------

NOTE: You will find two files in this github repo. Code.js will have all the relevant code grouped together WITH comments and then code.js will have the code WITHOUT comments.

----------------------------------


So from what I understand, we will have two input spreadsheets. We are combining two different tables into one. This is something we could easily do with SQL but alas, we are not going to be using SQL. So for this mini-tutorial I will create two example spreadsheets.

Contacts![Image1](/images/1.png)

&

Templates![Image2](/images/2.png)

So before we begin, we create a new standalone Google Scripts app. It needs to be standalone because we will be working with multiple files.

We can go here to create a new app and we will reach this page and can click "New Project" to create a standalone app, that is separate from any single google sheets document.

![Image3](/images/3.png)

So now that we got all that out of the way, let's do some actual coding. The first step we need to do is create references to both google sheets documents in our script so we can do operations onto them. This means we will need the script IDs for both of the previous documents. We can find this by going to the URL while having the sheet open in our web browser

![Image4](/images/4.png)

So let's create references to both files.

```javascript
function myFunction() {
  // note, you should always use const for values that aren't going to change

  const contactsFileId = "1fnlcmHpipV1MGbKObcyCJLB_HJmnxmDu8URtXplG0MU";
  const templatesFileId = "1M7taoQWZfUcN4INzj98dcQDAZYWs8zLGIuUJPKrHRNQ";

  // now with the fileIDs we can access their data using google's SpreadsheetApp object
  // you can find more info about SpreadsheetApp here v
  // https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app

  let ssContacts = SpreadsheetApp.openById(contactsFileId);
  let ssTemplates = SpreadsheetApp.openById(templatesFileId);
}
```

Now we have references to both files and can perform operations, including taking their data and outputing a spreadsheet. Now, in our specific example we know the size of the two tables we need the data from. For example, in the Contacts spreadsheet, the table is from B3:E10 and in the templates spreadsheet, the table is from B3:C5. We also know they are both on "Sheet1" of our spreadsheet. Using this information, we can create two javascript arrays with that information.

```javascript
  // we need to get references to the specific sheet the tables are on
  let sheetContacts = ssContacts.getSheetByName('Sheet1');
  let sheetTemplates = ssTemplates.getSheetByName('Sheet1');

  // we use .getRange() to select the range the tables are in
  // and .getValues() to take the information and output them into an array we can work with
  let contactsArr = sheetContacts.getRange('B3:E10').getValues();
  let templatesArr = sheetTemplates.getRange('B3:C5').getValues();
```

Now, we have two javascript arrays, which look like this

contactsArr

![Image5](/images/5.png)

&

templatesArr

![Image6](/images/6.png)

We need to note that both of them are arrays of arrays. So what we need to do now is to create a new javascript array that basically merges these two arrays. NOTE: there are better ways to do this, but based off /u/Anononimo98's claimed level of experience with javascript, I'm trying to stick to arrays

```javascript
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
```

Now we have one array, "newArr" which looks like this

![Image7](/images/7.png)

Now we are almost done. We have the array we need and we just need to a) create a new file and b) write that array to the new file

NOTE: after remembering that you need to use the advance drive service to create new files and not wanting to get into that because this tutorial is already getting longer than expected... we will create a new empty file manually in the same folder called output. Our folder looks like this

![Image8](/images/8.png)

So just like the others, we will need a reference to the file and then a reference to the sheet

```javascript
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
```

So now we just go to our script editor

![Image9](/images/9.png)

and click run -> run function -> myFunction()

It will ask us for some permissions because we using our script to automatically access our files. Just click through on advanced and accept the terms to tell daddy that's OK for your scripts to mess with your files.

![Image10](/images/10.png)



You may have to run the script again after giving permissions because Google is annoying, but once you run for the second time, open up the output file and you'll that everything moved over as planned

![Image11](/images/11.png)