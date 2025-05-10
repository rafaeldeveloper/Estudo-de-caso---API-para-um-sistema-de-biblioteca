// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('User Login', () => {
  // Setup: Create a test user before running login tests
  test.beforeAll(async ({ request }) => {
    // Create a test user via API
    const response = await request.post('/users', {
      data: {
        user: {
          name: 'Login Test User',
          ra: 'RA123456'
        }
      }
    });
    expect(response.ok()).toBeTruthy();
  });
  
  test('should allow a user to login with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    
    // Fill out the login form
    await page.fill('input[name="ra"]', 'RA123456');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify successful login - this could be a redirect to dashboard or a welcome message
    // Adjust according to your application's behavior
    await expect(page).toHaveURL('/dashboard');
    
    // Verify the user is logged in
    await expect(page.locator('.user-info')).toContainText('Login Test User');
  });
  
  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');
    
    // Fill out the login form with invalid credentials
    await page.fill('input[name="ra"]', 'InvalidRA999999');
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Verify error message is shown
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText(/Invalid credentials/);
    
    // Verify we're still on the login page
    await expect(page).toHaveURL('/login');
  });
  
  test('should redirect to login page when accessing protected routes', async ({ page }) => {
    // Try to access a protected route directly
    await page.goto('/dashboard');
    
    // Verify redirect to login page
    await expect(page).toHaveURL('/login');
    
    // Login with valid credentials
    await page.fill('input[name="ra"]', 'RA123456');
    await page.click('button[type="submit"]');
    
    // Verify redirect to the originally requested page
    await expect(page).toHaveURL('/dashboard');
  });
  
  test('should allow a user to logout', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="ra"]', 'RA123456');
    await page.click('button[type="submit"]');
    
    // Wait for login to complete
    await expect(page).toHaveURL('/dashboard');
    
    // Click on logout button/link
    await page.click('.logout-button');
    
    // Verify redirect to login page or home page
    await expect(page).toHaveURL(/\/(login|$)/);
    
    // Verify user is logged out by trying to access a protected route
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });
});

