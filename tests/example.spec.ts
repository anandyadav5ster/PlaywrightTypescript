import { test } from '../fixture';
import { expect } from 'playwright/test';


test.describe('Automation practice ',() =>{

  test('Home Page',
    {
      tag: ['@smoke @regression'],
      annotation: {type:'test_key', description:'mb-1234'},
    }, async({page,automationPractice}) =>{
      await expect(automationPractice).toHaveTitle('Automation Testing Practice: PlaywrightPractice');

  });

  test('Handle locators',
    {
      tag:['@locators'],
      annotation:{type:'test_key', description:'12345'},
  }, async({page,automationPractice})=>{
    
    await expect(automationPractice).toHaveTitle('Automation Testing Practice: PlaywrightPractice');
  });

  test('Handle new tab',async({context, page}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/');
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
  });

  test('handle simple popup', async({page,automationPractice}) =>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    // const [popup] = await Promise.all([
    //   await page.waitForEvent('popup'),
    //   await page.click('#alertBtn')
    // ])

    automationPractice.on('dialog', async(dialog) =>{
      console.log('simple aler msg', dialog.message());
      await dialog.accept();
    })

     await automationPractice.click('#alertBtn');
     const simpleAlertMsg = await automationPractice.locator('#demo').textContent();


  });

  test('Handle confirmation popup', async({page,automationPractice})=>{
    //  await page.click('#alertBtn');
    await page.goto('https://testautomationpractice.blogspot.com/');
    page.on('dialog', async (dialog) => {
    console.log('Dialog message:', dialog.message());
    
    // Accept or dismiss based on your need
    await dialog.accept(); // or dialog.dismiss();
  });
  await automationPractice.click('#confirmBtn');
  const popMsg = await page.locator('#demo').textContent();
  console.log(popMsg);
  });

test('Handle pop up window', async({context,page,automationPractice}) =>{
  await page.goto('https://testautomationpractice.blogspot.com/');
  const [newWin] = await Promise.all([
    context.waitForEvent('page'),
    await page.click('#PopUp')
  ]);
  await newWin.waitForLoadState();      
  const newWinTitle: string = await newWin.title();
  console.log(newWinTitle);
}) ;

test('Use fixture',
  {tag:['@orangehrm']}, 
  async({loggedInPage})=>{
  const title = await loggedInPage.title();
})

}); 



