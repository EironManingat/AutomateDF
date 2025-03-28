import { test, expect } from '@playwright/test';

test.describe('Mass Registration', () => {
  for (let i = 1; i <= 20; i++) {
    test(`Register User ${i}`, async ({ page }) => {
      // Generate unique email by incrementing the number
      const email = `eiron.maningat+test${342 + i}@dragonfi.ph`;

      // Navigate to the registration page
      await page.goto('https://web-dev-rc.dragonfi.ph/register', { waitUntil: 'domcontentloaded' });

      // Add a small random wait to prevent potential rate limiting
      await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000); // Random wait between 1-3 seconds

      // Verify the page heading is visible
      await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

      // Fill in registration form
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', 'Pass123!');
      await page.fill('input[name="confirmPassword"]', 'Pass123!');

      // Add another small wait before clicking checkbox
      await page.waitForTimeout(Math.floor(Math.random() * 1000) + 500); // Random wait between 0.5-1.5 seconds

      // Click on checkbox (possibly terms and conditions)
      const checkboxWrapper = page.locator('div.p-checkbox-box');
      await checkboxWrapper.click();

      // Add a final wait before submission
      await page.waitForTimeout(Math.floor(Math.random() * 1000) + 500);

      // Submit registration
      await page.getByRole('button', { name: 'REGISTER' }).click();

      // Wait for potential page load or processing
      await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);
      
      // Optionally log the registered email for tracking
      console.log(`Registered email: ${email}`);
    });
  }
});