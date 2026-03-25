import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Get the API token from report portal', async({page}) =>{
    await page.goto('https://demo.reportportal.io/ui/#login');
    const loginWithGitHub = page.locator("//span[text() ='Login with GitHub']");
    await loginWithGitHub.click();
    const username = page.locator('input[id="login_field"]');
    await username.clear();
    await username.fill('anandyadav5ster@gmail.com');
    const password = page.locator('input[id="password"]');
    await password.clear();
    await password.fill('Noki@56004901');
    const loginBtn = page.locator('input[name="commit"]');
    await loginBtn.click();
    console.log('login successfully')
    const loginAvatar = page.locator('img[alt="avatar"]');
    await loginAvatar.waitFor({state:'visible', timeout: 8000});
    await loginAvatar.click();
    const profile = page.locator('.userBlock__menu--FHvby>a[href="#userProfile"]');
    await profile.click();
    await page.locator('//div[contains(@class,"navigationTabs")]/a[@href="#userProfile/apiKeys"]').click();
    const revokeBtn = page.locator('//button[contains(@class,"ghostButton__ghost-button")]')
    .filter({hasText:'Revoke'}).first();
    if(await revokeBtn.isVisible()){
        await revokeBtn.click();
        page.on('dialog', d =>{
            d.accept();
        })
    }
    await page.locator('button[title="Generate API Key"]').click();
    await page.locator('input[type="text"]').fill('token_v1');
    await page.locator('//button[contains(@class,"bigButton__big-button")]')
    .filter({hasText:'Generate'}).first().click();


    // Using a CSS selector that combines the tag and the readonly attribute
const tokenValue = await page.locator('input[readonly].type-text').first().inputValue();

console.log(`The token is: ${tokenValue}`);
// 5. SAVE TOKEN TO FILE
    // This path must match the one defined in your playwright.config.ts
    const tokenPath = 'auth/rp_token.txt';
   

    // Ensure the directory exists
    if (!fs.existsSync(tokenPath)) {
        fs.mkdirSync(tokenPath, { recursive: true });
    }

    // Write the token to the file
    fs.writeFileSync(tokenPath, tokenValue, 'utf-8');
    console.log(`✅ Token successfully saved to: ${tokenPath}`);

    // Verify file exists
    expect(fs.existsSync(tokenPath)).toBeTruthy();
})