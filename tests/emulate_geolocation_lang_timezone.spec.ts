import { test, expect } from '@playwright/test';

test.use({
  geolocation: {
    latitude: 41.890221,
    longitude: 12.492348
  },
  locale: 'it-IT',
  permissions: ['geolocation'],
  timezoneId: 'Europe/Rome'
});

test('test', async ({ page }) => {
    await page.goto('https://www.bing.com/maps?cp=13.011771%7E77.736000&lvl=11&style=r');
    await expect(page.locator('#directionsButton')).toBeVisible();
   
    await expect(page.locator('#searchBoxInput')).toBeVisible();
});