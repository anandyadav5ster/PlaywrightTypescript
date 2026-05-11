// import {promise as fs} from 'fs';
import {test} from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';


test('Reading json file', async ({ page }) => {
    await getJsonData('./data/data.json'); // Don't forget await here too!
});

// async function getJsonData(filepath:string){
//         try{
//             const rawdata = await fs.readFile(filepath);
//             const jsonData = JSON.parse(rawdata);
//             console.log(jsonData);
//         }
//         catch (error){
//             console.error("Error reading JSON file", error)
//         }
//     }

async function getJsonData(filename: string){
// 1. You MUST await here to get the string content
    const rawData = await fs.readFile(filename, 'utf-8'); 
    
    // 2. Now rawData is a string, so JSON.parse will work
    const jsonData = JSON.parse(rawData);
    
    console.log(jsonData);
}