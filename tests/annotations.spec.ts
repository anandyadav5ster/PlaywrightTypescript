import { test, expect } from '@playwright/test';

test.skip('mark skip this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});

test.fail('mark fail this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});

test('mark slow this test', async ({ page }) => {
    test.slow();
    await page.goto('https://www.google.com');
});

test.fixme('mark fixme this test', async ({ page }) => {
  // Run only focused tests in the entire project.
});