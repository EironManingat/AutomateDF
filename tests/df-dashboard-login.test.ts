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


    // Click on the "Trade" button and wait for the new tab
   const context = page.context();

   page.locator('a.nav-link[href="/investing-club/home"]').click({ modifiers: ['Control'] }) // Open in new tab Investing Club
    await page.getByRole('link', { name: "Transactions" }).click({ modifiers: ['Control'] }); // Open in new tab

    const [investingClubTab, investorsCornerTab, transactionsTab] = await Promise.all([
      context.waitForEvent('page'),
      context.waitForEvent('page'),
      context.waitForEvent('page')
    ]);
 // Ensure all tabs are loaded
  await investingClubTab.waitForLoadState('domcontentloaded');
  await investorsCornerTab.waitForLoadState('domcontentloaded');
  await transactionsTab.waitForLoadState('domcontentloaded');

  // Print URLs of the opened tabs
  console.log(`Investing Club URL: ${investingClubTab.url()}`);
  //console.log(`Investor’s Corner URL: ${investorsCornerTab.url()}`);
  console.log(`Transactions URL: ${transactionsTab.url()}`);

  // Take screenshots of the opened tabs
  await investingClubTab.screenshot({ path: 'investing-club.png' });
 // await investorsCornerTab.screenshot({ path: 'investors-corner.png' });
  await transactionsTab.screenshot({ path: 'transactions.png' });
    

});
