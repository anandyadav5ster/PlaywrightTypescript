import {test, expect} from '@playwright/test';

test('visual testing', async({page}) =>{
    await page.goto('https://playwright.dev/');

    

   await expect(page).toHaveScreenshot('playwright.png', {
  mask: [page.locator('//span[contains(text(),"Playwright")]')]
});

})

