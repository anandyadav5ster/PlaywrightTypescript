import { test, expect, APIRequestContext,request } from '@playwright/test';

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
});