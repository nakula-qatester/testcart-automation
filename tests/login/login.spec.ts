import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });
});