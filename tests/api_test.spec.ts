import {Page, test, expect, APIResponse, Locator} from '@playwright/test';



test('Verify login and storageState', async({page}): Promise<void> =>{
    await page.goto('https://admlucid.com/Golf');
    const pageHeader: Locator = page.locator('h1')
    await expect(pageHeader).toContainText('Golf Courses');
    const dropDown: Locator = page.locator('select[name="CurrentFilter"]');
    await dropDown.selectOption('Australia');
    const filterBtn: Locator = page.getByRole('button',{name:'Filter'});
    await filterBtn.click();
    const rowSecond: Locator = page.locator('(//tbody//tr)[2]//td[2]');
    await expect(rowSecond).toContainText('Australia');
    const filter: Locator = page.locator("//i[contains(@class,'filter')]/parent::button");
    await filterBtn.click();
});

test('Handle calendar', async({page}) =>{
    await page.goto('https://admlucid.com/Books/Create2?');
    const calDate: Locator = page.locator('#Date');
    await calDate.fill('2026-05-20');
    const startTime: Locator = page.locator('#StartTime');
    await startTime.fill('12:00');
    const endTime: Locator = page.locator('#EndTime');
    await endTime.fill('18:00');
})