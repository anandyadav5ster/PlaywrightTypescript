import { test, expect } from '@playwright/test';
import {parse} from 'csv-parse';
import fs from 'fs';

const testData = fs.readFileSync('data/data.csv');

 const records = parse(testData,{
    columns: true,
    skip_empty_lines: true,
    trim: true
 })

 test('Read csv file', async() =>{
    for await (const record of records) {
         console.log(`${record.username} and ${record.password}`);
     }
 })

