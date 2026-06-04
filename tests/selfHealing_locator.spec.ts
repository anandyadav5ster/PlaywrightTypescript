import {test, Page, Locator} from '@playwright/test';

test('Self healing test', async({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/')
    async function findValidElement(page:Page, locators: Locator[]): Promise<Locator | null>{
        for(const locator of locators){
            if(await locator.isVisible({timeout: 1000})){
                return locator;
            }
        }
        return null;

    }

    const usernameFieldLocators = [
        page.locator('#name'),
        page.getByPlaceholder("Enter Name"),
        page.locator('input[type="text"]').first()
    ];

    const usernameField = await findValidElement(page,usernameFieldLocators);
    if (usernameField) {
    await usernameField.fill('myusername');
} else {
    console.error('Could not find a stable locator for the username field.');
}
});