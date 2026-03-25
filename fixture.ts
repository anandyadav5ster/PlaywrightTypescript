import {test as baseTest, Page,expect} from '@playwright/test'
import fs from 'fs';
import path from 'path';

export const test = baseTest.extend<{
    loggedInPage: Page;
    automationPractice:Page;
    rpToken: string;
}>({
    loggedInPage: async({browser}, use) =>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.locator('input[name="username"]').fill('Admin');
        await page.locator('input[name="password"]').fill('admin123');
        await page.locator('button[class*="login-button"]').click();

        await expect(page.locator('div[class*="orangehrm-dashboard-grid"]')).toBeVisible();

        await use(page);
        await context.close();

    },
    automationPractice: async({browser}, use) =>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://testautomationpractice.blogspot.com/');
        await page.locator('a[href*="playwrightpractice"]').click();
        await use(page);
    },

    rpToken: async ({ browser }, use) => {
        const tokenPath = 'auth/rp_token.txt';
        const authDir = path.dirname(tokenPath);
        let token = '';
        if (fs.existsSync(tokenPath)) {
            token = fs.readFileSync(tokenPath, 'utf-8').trim();
        }
    if(!token) {
        console.log('Generating new ReportPortal token via UI...');
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('https://demo.reportportal.io/ui/#login');
        await page.getByRole('button', { name: 'Login with GitHub' }).click();
        
        // Fill credentials (Use Env variables in production!)
        await page.locator('input[id="login_field"]').fill('anandyadav5ster@gmail.com');
        await page.locator('input[id="password"]').fill('Noki@56004901');
        await page.locator('input[name="commit"]').click();

        // Navigate to API Keys
        await page.getByAltText('avatar').click();
        await page.getByRole('link', { name: 'Profile' }).click();
        // await page.locator('a[href="#userProfile"]').filter({hasText:'Profile'}).click();
        await page.locator('div[class*="navigationTabs"]>a[href="#userProfile/apiKeys"]').click();

        // Handle Revoke if necessary
        const revokeBtn = page.getByRole('button', { name: 'Revoke' }).first();
        if (await revokeBtn.isVisible()) {
        page.on('dialog', d => d.accept());
        await revokeBtn.click();
        }

        // Generate
        await page.getByRole('button', { name: 'Generate API Key' }).click();
        await page.locator('input[type="text"]').fill('fixture_token');
        await page.locator('//button[text()="Generate"]').click();

        const token = await page.locator('input[readonly].type-text').first().inputValue();

        // Cache the token to a file for the Reporter/Config to see
        if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
        fs.writeFileSync(tokenPath, token, 'utf-8');
        console.log('✅ Token saved to file.');

            } finally {
                await context.close();
            }
        } else {
            console.log('Using existing ReportPortal token from cache.');
        }
// 3. Final safety check and pass to test
        if (!token) throw new Error("Failed to retrieve or generate ReportPortal token.");
        await use(token);
    },
 
});

export { expect } from '@playwright/test';