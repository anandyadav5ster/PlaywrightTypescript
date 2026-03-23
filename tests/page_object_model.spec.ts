import { test } from '@playwright/test';
import { PlaywrightDevPage} from './PlaywrightDevPage';


// export class PlaywrightDevPage {

//     readonly page: Page;
//     readonly getStarted: Locator;
//     constructor(page: Page){
//         this.page = page;
//         this.getStarted = page.locator('a[href="/docs/intro"]')
//         .filter({hasText:'Get started'});
//     }

//     async gotoApplication(){
//         this.page.goto('https://playwright.dev/');
//     }

//     async verifyHomePage(){
//         await expect(this.getStarted).toBeVisible();
//     }
// }

test('page object model', async({page}) =>{
    const pom = new PlaywrightDevPage(page);
    await pom.gotoApplication();
    await pom.verifyHomePage();

});