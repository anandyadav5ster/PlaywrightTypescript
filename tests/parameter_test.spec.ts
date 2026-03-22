import {test, expect} from '@playwright/test';


[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob', expected: 'Hello, Bob!' },
  { name: 'Charlie', expected: 'Hello, Charlie!' },
].forEach(({ name, expected }) => {
  // You can also do it with test.describe() or with multiple tests as long the test name is unique.
  test(`testing with ${name}`, async ({ page }) => {
	const url: string = `https://example.com/greet?${name}`;
	console.log(url);
    	await page.goto(url);
	
    await expect(page.getByRole('heading')).toHaveText(expected);
  });
});