import { test, expect } from '@playwright/test';

test.use({
    colorScheme: 'dark'
});

test('test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'TypeScript' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});