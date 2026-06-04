import {test, expect, BrowserContext, type Locator} from '@playwright/test';


test('Verify checkbox is checked', async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/checkboxes")
    const checkbox: Locator = page.locator('#checkboxes>input:nth-child(1)');

    if(!await checkbox.isChecked()){
        await checkbox.click();
    }
    await expect.soft(checkbox).toBeChecked();
})

test('Accept username password on prompt', async({browser}) =>{
    const context: BrowserContext = await browser.newContext({
        httpCredentials: {
        username: 'admin',
        password: 'admin'
    }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('//p[contains(text(),"Congratulations")]')).toBeVisible();
    await expect(page.locator(' #content>div>p')).toContainText('Congratulations');
   await context.close();


})