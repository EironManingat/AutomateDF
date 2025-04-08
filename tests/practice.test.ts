import { test, expect } from '@playwright/test';

test.setTimeout(120000); // 2 minutes

// Configure the test to run with slowMo
test.use({
  launchOptions: {
    headless: false,
    slowMo: 500 // 500ms delay between actions
  }
});

test('JUMIO Bypass', async ({ page }) => {

   // Navigate to the login page of ATLAS CMS
   await page.goto('https://atlas-dev.dragonfi.ph/#/login', { waitUntil: 'networkidle' });

   // Fill the username input field
   await page.fill('input[formcontrolname="username"]', 'complianceofficer@dragonfi.ph');
   
   // Type the password
   await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
   
   // Click the 'Sign In' button
   await page.getByRole('button', { name: 'Sign In' }).click();


});