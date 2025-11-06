import {test as baseTest, chromium, Browser, Page} from '@playwright/test';


const test = baseTest.extend<{
browserInstance: Browser;
pageInstance: Page;
}>({
    browserInstance:async({}, use) => {
        console.log('Launching Browser...');
        const browser = await chromium.launch({headless: false})

    }
})

export {test};