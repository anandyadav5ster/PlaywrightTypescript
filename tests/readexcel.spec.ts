import {test} from '@playwright/test';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
const excelPath =  path.resolve(process.cwd(),'data/data.XLSX');


 test(`Read excel file`, async ({ page }) => {
 let testData: any[] =[];

if(fs.existsSync(excelPath)){
     const workbook = XLSX.readFile(excelPath);
     const sheetname = workbook.SheetNames[0];
     const worksheet = workbook.Sheets[sheetname];

    testData = XLSX.utils.sheet_to_json(worksheet);
    for (const row of testData) {
        console.log(`${row.EmployeeID} and ${row.Name}`);
    }

}

});


