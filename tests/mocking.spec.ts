import {test,Page,expect} from '@playwright/test';
import { STATUS_CODES } from 'http';


test.describe('Test mocking',() =>{
   test("mocks a fruit and doesn't call api", 
    {
        tag:['@mocking'],
        annotation:{type:'test_key', description:'1234'}    
   },async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Mango', id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});

test('Mocking websocket connection',{},async({page})=>{
    await page.routeWebSocket('wss://example.com/ws',ws =>{
        ws.onMessage(message =>{
            STATUS_CODES: 200
            const json = {id:1 , name:'hello'}
            ws.send(JSON.stringify({response:json}))
        })
    })
});
test('Handle broken liks', async({page}) =>{
    await page.goto('https://www.example.com');
    const links = await page.$$eval('a', as=>as.map(a =>a.href))
    console.log(links.length);
    for(const link of links){
        const response = await page.request.get(link);
        if(response.ok()){
                   console.log(`✔ Working Link: ${link} - Status: ${response.status()}`);

        } else{
             console.log(`❌ Broken Link: ${link} - Status: ${response.status()}`);
        }
    }
    
})

})