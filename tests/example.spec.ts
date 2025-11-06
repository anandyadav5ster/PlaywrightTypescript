import { test } from '../baseTest';
import { expect } from 'playwright/test';


test.beforeEach('',async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/');
})
test.describe('Automation practice ',() =>{

  test('Home Page',
    {
      tag: ['@smoke @regression'],
      annotation: {type:'test_key', description:'mb-1234'},
    }, async({page}) =>{
      await expect(page).toHaveTitle('Automation Testing Practice');

  });

  test('Handle locators',
    {
      tag:['@locators'],
      annotation:{type:'test_key', description:'12345'},
  }, async({page})=>{
    await page.locator('a[href*="playwrightpractice"]').click();
    await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');
  });

  test('Handle new tab',async({context, page}) =>{
      const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('button[onClick="myFunction()"]').filter({hasText:'New Tab'}).click(),
      ])
      await newTab.waitForLoadState();

  // Get the title of the new tab
  const newTabTitle = await newTab.title();
  console.log('New Tab Title:', newTabTitle);
  await newTab.close();
  await page.bringToFront();
  const parentWindowTitle = await page.title();
  console.log(parentWindowTitle);
  })
});



