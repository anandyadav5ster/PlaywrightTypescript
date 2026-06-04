import { test, expect,APIResponse, request, chromium } from '@playwright/test';

/**
 * Interface for the Login response or form data
 */
test('api post request login', async({request}): Promise<void> =>{
    const baseUrl = 'https://practice.expandtesting.com/notes/api/users/login';
    const credentials = {
        email: 'james@gmail.com',
        password: 'James@1234'
    }


    const response: APIResponse = await request.post(baseUrl, {
        form: credentials,
        headers: {
            ContentType: 'application.json'
        }
    });
    const statusCode: number = response.status();
    expect(statusCode).toBe(200);
    const responseText: string = await response.text();
    expect(responseText).toContain('Login successful');
});


    test('Capture network request', async ({ page }) => {
        await page.on('request', request => console.log(request.url()));
    });
    test('Emulate mobile device', async ({ playwright, browser }) => {
        const iphone = playwright.devices['iPhone 16'];
        const context = await browser.newContext({
            ...iphone,
            permissions: ['geolocation'],
            geolocation: { latitude: 37.7749, longitude: -122.4194 }
        });
        const page = await context.newPage();
        const userAgent = await page.evaluate(() => navigator.userAgent);
        console.log(`user agent is ${userAgent}`);
        await page.goto('https://www.google.com');

    });

    test('Handle javascript code using evaluate', async ({ page }) => {
        await page.evaluate(() => console.log('javascript code'));
    });

    test('Handle exception', async ({ page }) => {
        await page.goto('https://www.google.com');
        try {
            await page.click('text=Google');
        }
        catch (error: any) {
            console.error('Error message is ', error.message);
        }
    });
    test('Launch developer tool', async ({ }) => {
        const context = await chromium.launch({ headless: false, devtools: true });
        const page = await context.newPage();
        await page.on('console', msg => console.log(msg.text()));
        await page.goto('https://playwright.dev/');
    });

    test('Capture console log', async ({ page }) => {
        await page.on('console', msg => console.log(msg.text()));
    });

    test('identifying and switching via titles', async ({ context, page }) => {
        await page.goto('https://example.com');

        // Open several tabs
        await context.newPage().then(p => p.goto('https://playwright.dev'));
        await context.newPage().then(p => p.goto('https://github.com'));

        // Get all open pages in the current browser context
        const allPages = context.pages();

        // Find a specific page based on its URL or Title
        let targetPage;
        for (const p of allPages) {
            const title = await p.title();
            if (title.includes('GitHub')) {
                targetPage = p;
                break;
            }
        }

        if (targetPage) {
            await targetPage.bringToFront();
            console.log('Successfully switched focus to:', await targetPage.title());
        }
    });

