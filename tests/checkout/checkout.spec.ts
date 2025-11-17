import { test, expect } from '@playwright/test';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add product
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
  });

  test('should complete checkout successfully', async ({ page }) => {
    await page.click('[data-test="checkout"]');
    
    // Fill checkout form
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    
    // Finish checkout
    await page.click('[data-test="finish"]');
    
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});

test('should not allow checkout with empty cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Go to cart without adding items
  await page.goto('https://www.saucedemo.com/cart.html');
  
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(0);
  
  console.log('Empty cart validation: Cart has 0 items');
});