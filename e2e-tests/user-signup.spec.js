// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('User Signup', () => {
  test('should allow a new user to sign up', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('/users/new');
    
    // Generate a unique username using timestamp
    const uniqueName = `Test User ${Date.now()}`;
    const uniqueRa = `RA${Date.now().toString().slice(-6)}`;
    
    // Fill out the signup form
    await page.fill('input[name="user[name]"]', uniqueName);
    await page.fill('input[name="user[ra]"]', uniqueRa);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify successful signup - this could be a redirect to profile page or a success message
    // Adjust according to your application's behavior
    await expect(page).toHaveURL(/\/users\/\d+/);
    
    // Verify the user data is displayed on the profile page
    await expect(page.locator('body')).toContainText(uniqueName);
    await expect(page.locator('body')).toContainText(uniqueRa);
  });
  
  test('should show validation errors for invalid signup', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('/users/new');
    
    // Submit the form without filling any fields
    await page.click('button[type="submit"]');
    
    // Verify validation errors are shown
    await expect(page.locator('.error-message')).toBeVisible();
    
    // Try with only one field filled
    await page.fill('input[name="user[name]"]', 'Test User');
    await page.click('button[type="submit"]');
    
    // Verify validation errors are still shown
    await expect(page.locator('.error-message')).toBeVisible();
  });
  
  test('should prevent duplicate RA registration', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('/users/new');
    
    // Create a user with a specific RA
    const uniqueName1 = `Test User ${Date.now()}`;
    const uniqueRa = `RA${Date.now().toString().slice(-6)}`;
    
    // Fill out the signup form
    await page.fill('input[name="user[name]"]', uniqueName1);
    await page.fill('input[name="user[ra]"]', uniqueRa);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for the submission to complete
    await page.waitForURL(/\/users\/\d+/);
    
    // Try to create another user with the same RA
    await page.goto('/users/new');
    
    const uniqueName2 = `Another User ${Date.now()}`;
    
    // Fill out the signup form with the same RA
    await page.fill('input[name="user[name]"]', uniqueName2);
    await page.fill('input[name="user[ra]"]', uniqueRa);
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify that an error message is shown
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText(/already been taken/);
  });
});

