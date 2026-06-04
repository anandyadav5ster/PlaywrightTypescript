import { test, expect } from '@playwright/test';
import { isValidateUserData, UserData } from '../utils/dataValidator';
import fs from 'fs';
import * as path from 'path';

const projectRootPath = process.cwd();
const dataPath = path.join(projectRootPath,'data','data.json');
const rawFileContent = fs.readFileSync(dataPath, 'utf8');
const parsedData = JSON.parse(rawFileContent);
console.log(parsedData);

if(!isValidateUserData(parsedData)){
    console.error("❌ Critical Failure: credentials.json breaks the UserData interface layout!");
    process.exit(1);
}

// Data is now safely typed as UserData automatically!
const testData: UserData = parsedData;

test('Verify admin credentials work', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', testData.admin.username);
    await page.fill('#password', testData.admin.password);
});

test('Loop through individual standard users', async ({ page }) => {
    for (const user of testData.users) {
        console.log(`Checking system availability for target profile ID: ${user.id}`);
        // Your automated actions per user record...
    }
});