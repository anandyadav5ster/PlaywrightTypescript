import {test as baseTest, Page,expect} from '@playwright/test'

export const test = baseTest.extend<{
    loggedInPage: Page;
    automationPractice:Page;
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
    }
})
