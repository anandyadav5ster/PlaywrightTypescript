import { test, expect } from '@playwright/test';

test.describe('Automation practice ',() =>{

  test('Home Page',
    {
      tag: ['@smoke @regression'],
      annotation: {type:'test_key', description:'mb-1234'},
    }, async({page}) =>{

      await page.goto('https://testautomationpractice.blogspot.com/');
      await expect(page).toHaveTitle('Automation Testing Practice');

  });

  test('Handle locators',
    {
      tag:['@locators'],
      annotation:{type:'test_key', description:'12345'},
  }, async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('a[href*="playwrightpractice"]').click();
    await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');
  })
})



