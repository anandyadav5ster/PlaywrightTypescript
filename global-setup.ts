import { request } from '@playwright/test';

/**
 * A simplified Global Setup example.
 * The goal: Log in once via API and save the session to a file.
 */
async function globalSetup() {
    // 1. Create a temporary request context (like a mini-browser for APIs)
    const requestContext = await request.newContext();

    // 2. Send the login credentials
    await requestContext.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'test007@gmail.com',
            password: 'password123'
        }
    });

    // 3. Save the session (cookies) to a local JSON file.
    // All tests will now look at this file to start as "Logged In".
    await requestContext.storageState({ path: './.auth/user.json' });

    // 4. Close the temporary context
    await requestContext.dispose();
}

export default globalSetup;