import { test, expect } from '@playwright/test';

test('Login, Extract Token, and Input it into Swagger UI', async ({ page }) => {
    // Step 1: Go to DragonFi login page
    await page.goto('https://dragonfi-website-dev.dragonfi.ph/login', { waitUntil: 'domcontentloaded' });

    // Step 2: Fill in login credentials and submit
    await page.fill('input[name="email"]', 'eiron.maningat+test100@dragonfi.ph'); // Replace with actual selector & username
    await page.fill('input[name="password"]', 'Pass123!'); // Replace with actual selector & password
    await page.click('button:has-text("Login")'); // Adjust button selector if needed

    // Step 3: Wait for the dashboard to load
    await page.waitForLoadState('networkidle');

    //input verification code
    await page.fill('input#otp', '123123'); 
    await page.click('button:has-text("Verify")'); 


    // Step 4: Extract token from local storage
    const loginData = await page.evaluate(() => localStorage.getItem('Login Data')); // Adjust key if needed

    if (!loginData) {
        throw new Error('Login Data not found in localStorage!');
    }

    const parsedData = JSON.parse(loginData); // Convert JSON string to object
    const token = parsedData?.token || parsedData?.accessToken; // Adjust property name if needed


    // Ensure token is valid before proceeding
    if (!token) {
        throw new Error('Token not found in local storage!');
    }

    // Step 5: Navigate to Swagger UI
    await page.goto('https://dragonfi-api-dev.dragonfi.ph/swagger/index.html', { waitUntil: 'domcontentloaded' });

    // Step 6: Click the "Authorize" button
    await page.click('button:has-text("Authorize")');

    // Step 7: Locate the Bearer Token input field and fill it with the extracted token
    await page.fill('input[placeholder="Bearer <api_key>"]', `Bearer ${token}`);

    // Step 8: Click the "Authorize" button in the modal
    await page.click('button:has-text("Authorize")');

    // Step 9: Click "Close" to apply authorization
    await page.click('button:has-text("Close")');

    // Step 10: Validate that Swagger UI is now authorized
    await expect(page.locator('button:has-text("Logout")')).toBeVisible(); // Ensure logout appears, confirming authorization
});
