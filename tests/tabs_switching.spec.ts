import { test, expect } from '@playwright/test';

test('Switch between multiple open tabs', async ({ page, context }) => {
    // 1. Open the initial page
    await page.goto('https://testautomationpractice.blogspot.com/');

    // 2. Trigger multiple new tabs (Example: clicking links that open in new windows)
    // For this example, we'll manually open new tabs for demonstration
    const page2 = await context.newPage();
    await page2.goto('https://www.google.com');

    const page3 = await context.newPage();
    await page3.goto('https://www.wikipedia.org');

    // 3. Get all open pages in the current browser context
    const allPages = context.pages();
    console.log(`Total tabs open: ${allPages.length}`);

    // 4. Switch by Index
    // allPages[0] is the original tab
    // allPages[1] is Google
    // allPages[2] is Wikipedia
    // const mainTab = allPages[0];
    // const mainTabTitle = await mainTab.title();
    const secondTab = allPages[1];
    await secondTab.bringToFront(); // Visually switches to this tab
    await expect(secondTab).toHaveTitle(/Google/);

    // 5. Switch by searching for a specific Title or URL
    let targetPage;
    for (const p of allPages) {
        const title = await p.title();
        if (title.includes('Wikipedia')) {
            targetPage = p;
            break;
        }
    }

    if (targetPage) {
        await targetPage.bringToFront();
        console.log('Successfully switched to Wikipedia tab');
    }

    // 6. Interaction Example: Perform action on a specific tab and return
    await allPages[0].bringToFront();
    await allPages[0].locator('#name').fill('Back to first tab');

    // 7. Cleanup: Close specific tabs
    await page2.close();
    await page3.close();
});