import { test, expect } from '@playwright/test';
import { CONFIG } from '../EnvironmentConfig';

test.describe('Multi-Environment Verification', () => {

    test('Should load the correct environment data', async ({ page }) => {
        // 1. Navigate to the baseUrl defined in the config
        

        // 2. Log current environment info for debugging
        console.log(`Current Environment: ${process.env.ENV || 'dev'}`);
        console.log(`Target API: ${CONFIG.apiUrl}`);
        await page.goto(CONFIG.baseUrl); 
        // 3. Verify page elements based on environment specific data
        await expect(page).toHaveURL(CONFIG.baseUrl);
    });

    test('Check admin credentials for current env', async () => {
        // You can use the CONFIG object anywhere in your tests
        console.log(`Using Admin: ${CONFIG.adminUser}`);
        expect(CONFIG.adminUser).toContain('@');
    });
});