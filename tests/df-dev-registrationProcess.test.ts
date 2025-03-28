import { test, expect } from '@playwright/test';

test.setTimeout(60000); // 60 seconds

test('Dashboard', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://web-dev-rc.dragonfi.ph/login', { waitUntil: 'domcontentloaded' });

  // Verify the "Log In" heading is visible
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();

  // Fill in login credentials and submit
  await page.fill('input[name="email"]', 'eiron.maningat+test302@dragonfi.ph');
  await page.fill('input[name="password"]', 'Pass123!');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Proceed through the initial steps
  await page.getByRole('button', { name: 'Proceed' }).click();

  // Select account type (individual)
  await page.locator('#account-type-individual').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Fill alias name and proceed
  await page.fill('input[id="aliasName"]', 'Test User 1st');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  // Fill personal information
  await page.fill('input[id="lastname"]', 'Maningat');
  await page.fill('input[id="firstname"]', 'Eiron');
  await page.fill('input[id="middlename"]', 'Sumala');
  await page.fill('input[name="mobileNumber"]', '9672404182');
  await page.fill('input[id="mat-input-0"]', '1/14/2002');

  // Select Civil Status
  await page.locator('text=Select Civil Status').click();
  await page.locator('text=Single').click();

   // Fill Gender
   await page.locator('label[for="male"]').click();
   // Select Region
  await page.locator('text=Select Region').click();
  await page.locator('text=[Region-III] Central Luzon').click();

  // Select Province
  await page.locator('text=Select Province').click();
  await page.locator('text=Bataan').click();

  // Select City
  await page.locator('text=Select City').click();
  await page.locator('text=Hermosa').click();

});