# End-to-End Tests with Playwright

This directory contains end-to-end tests for the library system application using Playwright.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Running Tests

Run all tests:
```
npm test
```

Run tests with UI mode (for debugging):
```
npm run test:ui
```

Run tests in headed mode (visible browser):
```
npm run test:headed
```

Run specific test suites:
```
npm run test:signup  # Run only signup tests
npm run test:login   # Run only login tests
```

## Test Structure

- `user-signup.spec.js`: Tests for user registration functionality
- `user-login.spec.js`: Tests for user authentication functionality
- `auth-helpers.js`: Helper functions for authentication-related test operations

## Notes

- Tests assume the Rails server is running on port 3000
- The Playwright configuration will automatically start the Rails server in test environment
- Tests are configured to run in parallel by default
- HTML test reports are generated after test runs

## Troubleshooting

If tests fail due to selectors not being found, you may need to update the selectors to match your actual HTML structure.

Common issues:
- Form field names don't match the expected names in tests
- CSS classes for error messages differ from what's expected in tests
- URL patterns for redirects are different in your application

Adjust the tests as needed to match your application's actual behavior and structure.

