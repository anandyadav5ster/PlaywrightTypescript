import { test, expect } from '@playwright/test';
// FIX: We import 'users' directly because that is the key in users.json
import { users } from '../data/data.json';

test.describe('JSON Data Driven Suite', () => {

    // Iterate through the 'users' array imported from the JSON
    for (const user of users) {
        
        test(`Login check for ${user.username}`, async ({ page }) => {
            await page.goto('https://automationexercise.com/login');

            // Using the data from the JSON
            await page.locator('input[data-qa="login-email"]').fill(user.email);
            await page.locator('input[data-qa="login-password"]').fill(user.password);
            await page.locator('button[data-qa="login-button"]').click();

            // Verification
            const logoutBtn = page.getByRole('link', { name: 'Logout' });
            await expect(logoutBtn).toBeVisible({ timeout: 10000 });
        });
    }
});
