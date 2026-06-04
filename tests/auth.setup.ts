import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import * as path from 'path';
// import { STORAGE_STATE } from '../playwright.config'; // Ensure this relative path is correct!

const authFile = path.join(__dirname,'./auth/login.json')

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to your login URL
    await page.goto('https://admlucid.com/Identity/Account/Login');

    // 2. Perform the login actions
    await loginPage.login('test2@admlucid.com', 'p8FrK4pE!g.ryKs');

    // 3. MANDATORY: Wait for authentication to succeed before saving state
    // If you don't wait, it will save an empty, unauthenticated state
    await page.waitForURL('https://admlucid.com/');

    // 4. Force save the storage state file
    console.log(`💾 Attempting to save storage state to: ${authFile}`);
    await page.context().storageState({ path: authFile });
    console.log(`✅ Storage state saved successfully!`);
});