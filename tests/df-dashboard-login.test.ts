import { test, expect } from '@playwright/test';

test.setTimeout(60000); // 60 seconds


test('has title', async ({ page }) => {
  await page.goto('https://www.dragonfi.ph/', { waitUntil: 'domcontentloaded' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DragonFi/);
});

test('Dashboard', async ({ page }) => {
  await page.goto('https://www.dragonfi.ph/', { waitUntil: 'domcontentloaded' });

  // Click the get login at the navbar.
  await page.getByRole('link', { name: 'LOGIN' }).click();

  // Expects page to have a heading with the name of DragonFi.
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  await page.fill('input[name="email"]', 'dragonfi.qa2024@gmail.com ');
  await page.fill('input[name="password"]', 'Test123!');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.fill('#otp', '123456'); 
  await page.getByRole('button', { name: 'VERIFY' }).click();


});
