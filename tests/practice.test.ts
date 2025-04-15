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
   await page.goto('https://atlas-uat.dragonfi.ph/#/login', { waitUntil: 'networkidle' });

   // Fill the username input field
   await page.fill('input[formcontrolname="username"]', 'complianceofficer@dragonfi.ph');
   
   // Type the password
   await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
   
   // Click the 'Sign In' button
   await page.getByRole('button', { name: 'Sign In' }).click();

   await page.locator('li.layout-root-menuitem:has(span:text-is("Clients"))').click();

   await page.locator('a:has(span:text-is("New Accounts for Approval"))').click();

   await page.getByText(acc, { exact: true }).click();



});