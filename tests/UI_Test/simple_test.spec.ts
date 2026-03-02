import { test, expect } from '@playwright/test';

test('Verify home page',{
    tag:['@google']
}, async({page}) =>{
    await page.goto('https://www.google.com');
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle(/Google/)
});

test('api test',{tag:['@api']}, async({request}) =>{
    const response = await request.get('https://automationexercise.com/api/productsList');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.products[0].id).toBe(1);
});


test('handle new tab', async({page,context}) =>{


    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        page.click('#newTab')
    ])

    await expect(newTab).toHaveTitle('seleium');
    await page.bringToFront();
});

test('Handle popup', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html#')
   
    page.on('dialog', alert =>{
        const msg = alert.message();
        console.log(msg)
        alert.accept();
    })
     await page.click('#alertBtn');
});

test('APi mocking', async({page}) =>{
    // await page.goto('**/api/user/profile');
   const targetUrl = '**/api/productsList';

        // 1. Setup the Interceptor
        await page.route(targetUrl, async (route) => {
            // Optional: Fetch the real response first if you want to inspect it
            // const realResponse = await route.fetch();
            // console.log('Real Status:', realResponse.status());

            const mockData = [{id:123, name: 'sameer'}]
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
        await page.goto('https://automationexercise.com/');
const body = await page.evaluate(async (url) => {
            const response = await fetch('https://automationexercise.com/api/productsList');
            return await response.json();
        });

        console.log('Mocked Body Received in Test:', body);

});
 

test('API mocking', async({page}) =>{
  
  const baseURL: string = 'https://automationexercise.com/';
  const targetURL:string = '**/api/productsList';
  
  await page.route(targetURL, async(route) =>{
      
       const mockData = [{id:123, name:'Sameer'}];
       await route.fulfill({
         status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
       }) ;
    
    });
     await page.goto('https://automationexercise.com/');
        const body = await page.evaluate(async (url) => {
            const response = await fetch('https://automationexercise.com/api/productsList');
            return await response.json();
        });
       console.log('Mocked Body Received in Test:', body);
});

 
test('Handle API mocking..', async({page}) =>{
     const baseURL: string = 'https://www.example.com/';
     const targetURL: string = '**/api/productList';
  
     await page.route(targetURL, async(route) =>{
          const mockData = [{id: 123, name:'sameer'}];
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body : JSON.stringify(mockData)
          }); 
     });
  
      await page.goto(baseURL);
      const responseBody = await page.evaluate(async (url) => {
           const response = await fetch( '**/api/productList');
           return {
             status: response.status,
             body: await response.json()
           }
      });
  
      console.log(`Mocked response body is ${JSON.stringify(responseBody.body)}`)
});
test('Handle API mocking_1', async({page}) =>{
  
  const baseURL:string = 'https://www.example.com/';
  const targetURL:string = '**/api/productList';
    
  await page.route(targetURL, async(route) =>{
    const mockData = [{id:123, name:'James'}];
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData)
      
    });
  });
  
  await page.goto(baseURL);
  const responseBody = await page.evaluate(async(url) => {
    const response = await fetch('https://automationexercise.com/api/productList');
    return {
      status: response.status,
      body: await response.json()
    }
  });
  console.log(`Mocking response body is ${JSON.stringify(responseBody.body)}`)
  
});


