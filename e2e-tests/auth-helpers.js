// @ts-check

/**
 * Helper functions for authentication-related test operations
 */
class AuthHelpers {
  /**
   * Create a new user for testing purposes
   * @param {import('@playwright/test').APIRequestContext} request - Playwright request context
   * @param {Object} userData - User data to create
   * @returns {Promise<Object>} - Created user data
   */
  static async createTestUser(request, userData = {}) {
    const defaultUser = {
      name: `Test User ${Date.now()}`,
      ra: `RA${Date.now().toString().slice(-6)}`
    };
    
    const user = { ...defaultUser, ...userData };
    
    const response = await request.post('/users', {
      data: { user }
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to create test user: ${await response.text()}`);
    }
    
    return await response.json();
  }
  
  /**
   * Login a user via the UI
   * @param {import('@playwright/test').Page} page - Playwright page
   * @param {string} ra - User RA for login
   */
  static async loginViaUI(page, ra) {
    await page.goto('/login');
    await page.fill('input[name="ra"]', ra);
    await page.click('button[type="submit"]');
    
    // Wait for navigation to complete
    await page.waitForURL('/dashboard');
  }
  
  /**
   * Login a user via API (faster than UI for test setup)
   * @param {import('@playwright/test').APIRequestContext} request - Playwright request context
   * @param {string} ra - User RA for login
   * @returns {Promise<Object>} - Login response data including any tokens
   */
  static async loginViaAPI(request, ra) {
    const response = await request.post('/login', {
      data: { ra }
    });
    
    if (!response.ok()) {
      throw new Error(`Failed to login via API: ${await response.text()}`);
    }
    
    return await response.json();
  }
  
  /**
   * Logout the current user
   * @param {import('@playwright/test').Page} page - Playwright page
   */
  static async logout(page) {
    await page.click('.logout-button');
    await page.waitForURL(/\/(login|$)/);
  }
}

module.exports = AuthHelpers;

