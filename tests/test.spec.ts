import {Page,test, expect, type Locator} from '@playwright/test';

interface Product{
    id: string,
    name: string,
    data: ProductData | null
}


interface ProductData{
    color?:string,
    capacity?: string,
    price?: number|string,
    year: number,
    'CPU model'?: string,
    'Hard disk size': string,
    [key:string]: any;

}

class LoginPage{
    readonly page:Page;

    constructor(page:Page){
        this.page = page;

    }

    async goto(){
        this.page.goto('https://practicetestautomation.com/practice-test-login/');
    }

    async login(username:string, password: string){
        await this.page.fill("#username",username);
        await this.page.fill("#password",password);
        await this.page.click('#submit');
    }
}
test.describe('Login',() =>{
    let loginPage: LoginPage;
    // test.beforeEach(async({page}) =>{
    //     loginPage = new LoginPage(page);
    //      await loginPage.goto();
    //     await loginPage.login('student','Password123');
    // })
    test('should login successfully', async ({ page }) => {
       loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('student','Password123');
        const loginSuccessfully = await page.locator("//h1[@class='post-title']");
        await expect(loginSuccessfully).toHaveText('Logged In Successfully');
        const user: Locator = page.locator("a[href*='test-login']");
        // await user.waitFor({state:'visible'}) // other condition attached/detached/visible/hidden
        await user.waitFor({state:'attached'})
        // await page.waitForSelector("a[href*='test-login']");
        const title = await page.title();
        console.log(title);
        await expect(page).toHaveTitle(/Logged In Successfully/);
        await expect(page).toHaveURL(/.*logged-in-successfully/);
        await expect(user).toHaveText('log out',{ignoreCase: true});
        await expect(user).toHaveCount(1);
        await expect(user).toBeAttached();
        await expect(user).toBeEnabled();
        await expect(user).toBeTruthy();
        
    });
    test('api test', async({request}) =>{
        const url = 'https://api.restful-api.dev/collections';
       // const credentials = {
            // username: 'anandyadav5ster@gmail.com',
            //password: 'Test@1234'
          //  'x-api-key': 'ab7ef9be-17df-4621-b27d-5e45036be6c3@1234'
       // }
        // const response = await request.get(url, {
        //     headers:{
        //      'x-api-key': 'ab7ef9be-17df-4621-b27d-5e45036be6c3@1234',
        //     'Accept': 'application/json'
        //     }
        // });
        const response = await request.get('https://api.restful-api.dev/objects');
        console.log(response.status());
        await expect(response.status()).toBe(200);
        const products:Product[] = await response.json();
        const firstProduct = products[0];
        expect(typeof firstProduct.id).toBe('string');
        expect(typeof firstProduct.name).toBe('string');
        if(firstProduct){
            console.log(firstProduct.name);
        }
// Map to a clean list of names
const productNames = products.map(p => p.name);
        console.log(productNames);

        for( const product of products){
            if(!product.data){
                console.log(`Product ${product.name} has no data.`);
                continue
            }
            // 2. Iterate over the object entries
            Object.entries(product.data).forEach(([key,value]) => {
                console.log(`${key}${value}`)
            });
        }

    })
})
