import { test, expect } from '@playwright/test';
import { SwaglabsPage } from '../Pages/SwaglabsPage';

test('Swag Labs: login with standard_user', async ({ page }) => {
    const swaglabs = new SwaglabsPage(page);

    await swaglabs.goto();
    await swaglabs.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(swaglabs.productsTitle).toHaveText('Products');
});

