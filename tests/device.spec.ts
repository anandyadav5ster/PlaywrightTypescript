import { test, expect, devices } from '@playwright/test';
import {IphoneDevice} from '../Pages/IphoneDevice';

let iPhoneDevice: any;
test.use({
    ...devices['iPhone 13'],
});
test.beforeEach(async({page}) =>{
    iPhoneDevice = new IphoneDevice(page);
})

test('test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await iPhoneDevice.getStarted.click();
    await iPhoneDevice.onThispage.click();
    await iPhoneDevice.exampleTest.click();
    await expect(iPhoneDevice.exampleTest).toBeVisible();

});