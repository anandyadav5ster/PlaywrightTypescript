import { test, expect } from '@playwright/test';

test('MCP: search Google for Playwright', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Handle potential consent / cookie dialog that blocks the search input
  const consent = page.locator('button:has-text("I agree"), button:has-text("Accept all"), button:has-text("Agree")');
  if (await consent.count() > 0) {
    try {
      await consent.first().click({ timeout: 3000 });
    } catch (e) {
      // ignore if not clickable
    }
  }

  const search = page.locator('input[name="q"]');
  await search.waitFor({ state: 'visible', timeout: 20000 });
  await search.fill('Playwright');
  await search.press('Enter');

  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle(/Playwright/i);

  await page.screenshot({ path: 'playwright-report/mcp-google-search.png', fullPage: true });
});
