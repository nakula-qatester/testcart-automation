import { test, expect } from '@playwright/test';

test.describe('Product Listing Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('should display all products', async ({ page }) => {
    const productItems = page.locator('.inventory_item');
    await expect(productItems).toHaveCount(6);
  });

  test('should sort products by price low to high', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'lohi');
    
    const firstProductPrice = await page.locator('.inventory_item').first().locator('.inventory_item_price').textContent();
    expect(firstProductPrice).toBe('$7.99');
  });
});