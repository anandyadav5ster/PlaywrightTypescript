import {test, expect, APIRequestContext, APIResponse} from '@playwright/test';
import { EmployeeDetails, ProductData } from '../model/response';

test('Home page',{
    tag:['@homepage'],
    annotation:{type:'test_key',description:'id-12345'}
},async({page}) =>{
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
})

test('API test example',{},async({request}) =>{

     const response: APIResponse = await request.get('https://api.restful-api.dev/objects');
     await expect(response.ok()).toBeTruthy();
     const statusCode: number = response.status();
     console.log(statusCode);
     const responseBody: EmployeeDetails[] = await response.json();
     for (const item of responseBody) {
  await expect(item.id).toBeTruthy();
  await expect(item.name).toBeTruthy();
  console.log(`ID: ${item.id}, Name: ${item.name}`);  
  if (item.data) {
    console.log(`Generation: ${item.data.Generation}, Price: ${item.data.Price}, Capacity: ${item.data.Capacity}`);
  }
}
   const productData: ProductData[] = await response.json();
   for(const item of productData){
        console.log(`Generation: ${item.Generation}, Price: ${item.Price}, Capacity: ${item.Capacity}`);
   }

})
