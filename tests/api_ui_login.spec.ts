import { test, expect, APIRequestContext,request, chromium } from '@playwright/test';

/**
 * Interface for the Login response or form data
 */
interface LoginCredentials {
  email: string;
  password: string;
}

test.describe('Automation Exercise: API to UI Integration', () => {
  const baseUrl = 'https://practicetestautomation.com/practice-test-';
  const credentials: LoginCredentials = {
    email: 'student', // Replace with a registered user
    password: 'Password123'
  };

  test('should authenticate via API and verify login in UI', async ({ page, playwright }) => {
    // 1. Create an isolated API context to perform the login
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: baseUrl
    });
    

    console.log('Step 1: Authenticating via API...');
    
    // Automation Exercise uses standard form-data for login
    const loginResponse = await apiContext.post('/login', {
      form: {
        email: credentials.email,
        password: credentials.password,
      }
    });

    // Validate the API call was successful
    expect(loginResponse.ok()).toBeTruthy();

    // 2. Capture the auth state (cookies)
    const storageState = await apiContext.storageState();
    
    // 3. Inject the state into the current browser page context
    await page.context().addCookies(storageState.cookies);

    console.log('Step 2: Navigating to UI as authenticated user...');
    await page.goto(baseUrl);

    // 4. Verification: Check for elements only visible to logged-in users
    const loggedInText = page.locator('text=Test Exceptions');
    await expect(loggedInText).toBeVisible();
  });
  test('Capture network request', async({page}) =>{
    await page.on('request', request => console.log(request.url()));
  });
  test('Emulate mobile device', async({ playwright, browser }) =>{
    const iphone = playwright.devices['iPhone 16'];
    const context = await browser.newContext({ ...iphone,
      permissions : ['geolocation'],
      geolocation : {latitude:37.7749,longitude:-122.4194}
     });
     const page = await context.newPage();
     const userAgent = await page.evaluate(() => navigator.userAgent);
     console.log(`user agent is ${userAgent}`);
     await page.goto('https://www.google.com');

  });

  test('Handle javascript code using evaluate', async({page}) =>{
    await page.evaluate(() => console.log('javascript code'));
  });

  test('Handle exception', async({page}) => {
    await page.goto('https://www.google.com');
    try{
    await page.click('text=Google');
  }
    catch(error:any){
        console.error('Error message is ', error.message);
    }
  });
  test('Launch developer tool', async({}) =>{
    const context = await chromium.launch({headless: false, devtools:true});
    const page = await context.newPage();
    await page.on('console', msg => console.log(msg.text()));
    await page.goto('https://playwright.dev/');
  });

  test('Capture console log', async({page}) =>{
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
});