import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('should add product to cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('should remove product from cart', async ({ page }) => {
    // Add product first
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Remove product
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });
});