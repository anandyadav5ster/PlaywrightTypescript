import { test, expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {

    readonly page: Page;
    readonly getStarted: Locator;
    constructor(page: Page){
        this.page = page;
        this.getStarted = page.locator('a[href="/docs/intro"]')
        .filter({hasText:'Get started'});
    }

    async gotoApplication(){
        this.page.goto('https://playwright.dev/');
    }

    async verifyHomePage(){
        await expect(this.getStarted).toBeVisible();
    }
}

test('page object model', async({page}) =>{
    const pom = new PlaywrightDevPage(page);
    await pom.gotoApplication();
    await pom.verifyHomePage();

});