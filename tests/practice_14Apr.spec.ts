import{test, expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

test('Handle multiple window', async({page,context}) =>{
    await page.goto('https://www.google.com');
    const page1 = await context.newPage();
    await page1.goto('https://www.amazon.in');
    const page2 = await context.newPage();
    await page2.goto('http://www.wikipedia.com');

    let targetPage ;

    const allPages = await context.pages();
    for (const page of allPages){
        const title = await page.title();
        if(title.includes('wikipedia')){
            targetPage = page;
            break;
        }
    }
    if(targetPage){
        await targetPage.bringToFront();
        console.log("Swicth to target page successfully");
    }

    await allPages[0].bringToFront();

});


test('read csv file', async({page})=>{
    const csv_path = fs.readFileSync('./data/data.csv');
    const records = parse(csv_path,{
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
    for await (const record of records as Record<string,unknown>[]){
        console.log(`${record.username} and ${record.password}`)
    }


});