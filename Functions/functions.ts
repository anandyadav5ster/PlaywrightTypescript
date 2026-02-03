import {Page, Locator, FrameLocator} from '@playwright/test';
import {Locators} from '../Locators/locators';


export class Functions {
    public readonly page: Page;
    public readonly locators: Locators;

    constructor(page: Page){
        this.page = page;
        this.locators = new Locators(page);
    }

    async clickElement(locator: Locator): Promise<void>{
        await locator.click();
    }

    async fillInput(locator: Locator, value: string): Promise<void>{
        await locator.fill(value);
    }

    async fillFrameInput(element: FrameLocator,selector:string, val: string): Promise<void>{
        await element.locator(selector).fill(val)
    }
    async clickFrame(element: FrameLocator,selector: string): Promise<void>{
       await element.locator(selector).click();
    }

    async mouseHover(element: Locator): Promise<void>{
        await element.hover();
    }
}