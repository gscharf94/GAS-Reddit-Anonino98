# GAS-Reddit-Anonino98

Here is the prompt our friend /u/uAnonino98 needed assistance with
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


So from what I understand, we will have two input spreadsheets. We are combining two different tables into one. This is something we could easily do with SQL but alas, we are not going to be using SQL. So for this mini-tutorial I will create two example spreadsheets.

Contacts![Image1](/images/1.png)

&

Templates![Image2](/images/2.png)

So before we begin, we create a new standalone Google Scripts app. It needs to be standalone because we will be working with multiple files.

We can go here to create a new app and we will reach this page and can click "New Project" to create a standalone app, that is separate from any single google sheets document.

![Image3](/images/3.png)