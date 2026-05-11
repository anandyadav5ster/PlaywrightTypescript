import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';

test('Verify api mocking', async ({ page }) => {
    await page.route('**/api/v1/fruits', async route => {
        const mockData = [{ id: 91, name: 'India' }];

        await route.fulfill({
            status: 200,
            json: mockData,
            contentType: 'application/json'
        });

        const responsePromise = page.waitForResponse('**/api/v1/fruits');
        await page.goto('https://demo.playwright.dev/api-mocking');
        const response = await responsePromise;
        await expect(response.status()).toBe(200);
        await expect(page.getByText('India')).toBeVisible();
    });
});

test('verify switching tab', { tag: '@switchTabs' }, async ({ page, context }) => {

    await page.goto('https://www.google.com');
    const page1 = await context.newPage();
    await page1.goto('https://www.amazon.in');
    const page2 = await context.newPage();
    await page2.goto('http://www.bing.com');
    const page3 = await context.newPage();
    await page3.goto('http://www.wikipedia.com');

    const allPage = await context.pages();

    let targetPage;

    for (const p of allPage) {
        const title = await p.title();
        if (title.includes('wikipedia')) {
            targetPage = p;
            break;
        }
    }
    if (targetPage) {
        await targetPage.bringToFront();
        console.log(`Switch to target page is successfully`);
    }
    await allPage[0].bringToFront();
    await page1.close();
    await page2.close();
    await page3.close()
    await page.close();
});



test('Read csv file', { tag: '@csv' }, async () => {
    const csvFilePath = fs.readFileSync('../data/data.csv');

    const records = parse(csvFilePath, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
    for (const record of records as Record<string,unknown>[]) {
        console.log(`${record.username} and ${record.password}`);
    }
});

test('Read json data', { tag: "@readjsondata" }, async ({ }) => {
    const users = [{ email: "test@gmail.com", password: 'James' },
    { email: "test1@gmail.com", password: 'John' }
    ];
    console.log(typeof users);
    console.log("Users data is=======================");
    //console.log(`${users[0].email} and ${users[0].password}`);
    for (const user of users) {
        console.log(`${user.email} and ${user.password}`);
    }

});

test('Handle new tab', { tag: '@newTab' }, async ({ page, context }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const [newTab] = await Promise.all([
        context.waitForEvent("page"),
        page.locator('//button[@onclick="myFunction()"]').filter({ hasText: 'New Tab' }).click()
    ]);

    await newTab.bringToFront();
    const title = await newTab.title();
    console.log(title);
    await expect(newTab).toHaveTitle(title);
});




