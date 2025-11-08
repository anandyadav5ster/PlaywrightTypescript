import { test } from '../fixture';
import { expect } from 'playwright/test';



test.describe('Automation practice ',() =>{

  test('Home Page',
    {
      tag: ['@smoke @regression @automationPractice'],
      annotation: {type:'test_key', description:'mb-1234'},
    }, async({automationPractice}) =>{
      await expect(automationPractice).toHaveTitle('Automation Testing Practice: PlaywrightPractice');

  });





test('Use fixture', async({loggedInPage})=>{
  const title = await loggedInPage.title();
})

}); 



