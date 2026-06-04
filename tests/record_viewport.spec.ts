import { test, expect } from '@playwright/test';

test.use({
    viewport: {
        height: 600,
        width: 800
    }
});

test('test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('code').filter({ hasText: 'npm init playwright@latest' }).click();
    await page.getByRole('link', { name: 'Next Writing tests »' }).click();
    await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Next Writing tests »' }).click();
    await page.getByRole('heading', { name: 'Writing tests' }).click();
    await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
});