import { Page,Locator } from "playwright";



export class IphoneDevice {

    readonly page: Page;
    readonly getStarted: Locator;
    readonly onThispage: Locator;
    readonly exampleTest: Locator;

    constructor(page: Page){
        this.page = page;
        this.getStarted = page.getByRole('link', { name: 'Get started' });
        this.onThispage = page.getByRole('button', { name: 'On this page' });
        this.exampleTest = page.getByRole('link', { name: 'Running the Example Test', exact: true });
    }

}