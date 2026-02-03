import {Page, Locator, FrameLocator} from '@playwright/test';

export class Locators {
    public readonly page:Page;
    public readonly editorFrame: FrameLocator;
    private readonly leftFrame: string;
    public readonly topFrame: FrameLocator; 
    public readonly username: Locator;
    public readonly avatar1: Locator;
    public readonly news: Locator;
    constructor(page: Page) {
       
    this.page = page;
    this.username = page.locator('#username');
    this.editorFrame = page.frameLocator('#mce_0_ifr');
    this.topFrame = page.frameLocator('frame[name="frame-top"]');
    this.leftFrame = ("frame[name='frame-left']");
    this.avatar1 = page.getByAltText('User Avatar').first();
    this.news = page.locator("a[href*='news']");
    }

     getLeftFrame(): FrameLocator {
        return this.topFrame.frameLocator(this.leftFrame);
    }
}