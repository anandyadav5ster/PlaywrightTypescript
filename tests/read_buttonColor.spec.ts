import {test} from '@playwright/test';


test('Read button color', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    const loginButton = page.locator('#login-button');
    const buttonColor = await loginButton.evaluate((el) => {
        window.getComputedStyle(el).getPropertyValue('backgroundcolor');
    });

    console.log(buttonColor);

});