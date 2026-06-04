
import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import {test} from '@playwright/test';

const testData = fs.readFileSync("data/user.xml");

test("Reading xml file ", async() => {

    const parser = new XMLParser();
    const jsonObj = parser.parse(testData);
    console.log(jsonObj);
    const userEmail = jsonObj.TestData.User.Email;
    console.log(userEmail);

})