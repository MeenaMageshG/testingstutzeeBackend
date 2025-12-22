import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/Login';

test.describe('Login - Positive Test Case', () => {

  test('TC001 - Login with valid credentials successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin@stutzee.com', '123456789');

    await page.waitForLoadState('networkidle');

  });

});
