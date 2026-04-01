import { expect, type Locator, type Page } from '@playwright/test';

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