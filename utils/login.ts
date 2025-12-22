// utils/login.ts
import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  // Navigate to login page
  await page.goto('https://crm.stutzee.xyz/event'); // replace with actual login URL

  // Wait for username input and fill
  const usernameInput = page.getByPlaceholder('Username'); // adjust placeholder if needed
  await expect(usernameInput).toBeVisible({ timeout: 15000 });
  await usernameInput.fill(username);

  // Wait for password input and fill
  const passwordInput = page.getByPlaceholder('Password');
  await expect(passwordInput).toBeVisible({ timeout: 15000 });
  await passwordInput.fill(password);

  // Click login button
  const loginBtn = page.getByRole('button', { name: 'Login' });
  await expect(loginBtn).toBeVisible({ timeout: 10000 });
  await loginBtn.click();

  // Wait for dashboard (open drawer) to be visible
  const openDrawer = page.getByRole('button', { name: 'open drawer' });
  await expect(openDrawer).toBeVisible({ timeout: 15000 });
}
