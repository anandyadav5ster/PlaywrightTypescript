import { test, expect } from '@playwright/test';

test.use({
    storageState: 'auth.json'
});

test('test', async ({ page }) => {
    await page.goto('https://github.com/microsoft/playwright');
    await page.getByRole('link', { name: 'tests, (Directory)' }).click();
    await expect(page.locator('#repository-container-header').getByRole('link', { name: 'microsoft' })).toBeVisible();
});