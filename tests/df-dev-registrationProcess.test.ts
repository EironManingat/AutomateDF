import { test, expect } from '@playwright/test';

// Increase timeout for the entire test
test.setTimeout(120000); // 2 minutes

// Configure the test to run with slowMo
test.use({
  launchOptions: {
    headless: false,
    slowMo: 500 // 500ms delay between actions
  }
});

test('Dashboard', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://web-dev-rc.dragonfi.ph/login', { waitUntil: 'networkidle' });
  
  // Verify the "Log In" heading is visible
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  
  // Fill in login credentials and submit
  await page.fill('input[name="email"]', 'eiron.maningat+test302@dragonfi.ph');
  await page.fill('input[name="password"]', 'Pass123!');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  
  // Proceed through the initial steps - wait for button to be visible first
  await page.getByRole('button', { name: 'Proceed' }).waitFor();
  await page.getByRole('button', { name: 'Proceed' }).click();
  
  // Select account type (individual)
  await page.locator('#account-type-individual').waitFor();
  await page.locator('#account-type-individual').click();
  
  await page.getByRole('button', { name: 'Next' }).waitFor();
  await page.getByRole('button', { name: 'Next' }).click();
  
  await page.getByRole('button', { name: 'Next' }).waitFor();
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Fill alias name and proceed
  await page.locator('input[id="aliasName"]').waitFor();
  await page.fill('input[id="aliasName"]', 'Test User 1st');
  
  await page.getByRole('button', { name: 'Next' }).waitFor();
  await page.getByRole('button', { name: 'Next' }).click();
  
  await page.getByRole('button', { name: 'Next' }).waitFor();
  await page.getByRole('button', { name: 'Next' }).click();
  
  await page.getByRole('button', { name: 'Proceed' }).waitFor();
  await page.getByRole('button', { name: 'Proceed' }).click();
  
  // Wait for form fields to be visible
  await page.locator('input[id="lastname"]').waitFor();
  
  // Fill personal details
  await page.fill('input[id="lastname"]', 'Maningat');
  await page.waitForTimeout(500);

  await page.fill('input[id="firstname"]', 'Eiron');
  await page.fill('input[id="middlename"]', 'Sumala');
  await page.fill('input[name="mobileNumber"]', '9672404182');
  await page.fill('input[id="mat-input-0"]', '01/14/2002');
  
   // Select Civil Status
  await page.locator('text=Select Civil Status').click();
  await page.locator('text=Single').click();

    // Fill Street address
  await page.fill('input[id="residentialAddress1"]', '1234 Test St');
 
  // Fill Place of birth
  await page.fill('input[name="birthPlace"]', 'Bethlehem');
  
  // Fill Gender
  await page.locator('label[for="male"]').waitFor();
  await page.locator('label[for="male"]').click();
  
  // For dropdowns, use a more robust approach
  // Select Region
  await page.locator('text=Select Region').waitFor();
  await page.locator('text=Select Region').click();
  await page.waitForTimeout(1000); // Wait for dropdown to fully open
  await page.locator('text=[Region-III] Central Luzon').click();
  await page.waitForTimeout(1000); // Wait for selection to register
  
  // Select Province
  await page.locator('text=Select Province').waitFor();
  await page.locator('text=Select Province').click();
  await page.waitForTimeout(1000);
  await page.locator('text=Bataan').click();
  await page.waitForTimeout(1000);
  
  // Select City
  await page.locator('text=Select City').waitFor();
  await page.locator('text=Select City').click();
  await page.waitForTimeout(1000);
  await page.locator('text=Hermosa').click();
  await page.waitForTimeout(1000);
  
  // Select Barangay
  await page.locator('text=Select Barangay').waitFor();
  await page.locator('text=Select Barangay').click();
  await page.waitForTimeout(1000);
  await page.locator('text=San Pedro').click();
  await page.waitForTimeout(1000);
  
  // Save & Next
  const saveNextButton = page.getByRole('button', { name: 'Save & Next' });
  await saveNextButton.waitFor();
  await saveNextButton.click();


  //STEP 2 FINANCIAL INFORMATION

  // Select Employment Status
  await page.locator('id =employmentStatus').waitFor();
  await page.locator('id =employmentStatus').click();
  await page.locator('text=Student').click();

  // Fill Investment Objective
  await page.locator('label[for="1"]').waitFor();
  await page.locator('label[for="1"]').click();


  //Fill in Annual Income
  await page.locator('text=Select Annual Income').waitFor();
  await page.locator('text=Select Annual Income').click();
  await page.waitForTimeout(1000);
  await page.locator('text=<= 500K').click();

  //Fill in Total Assets
  await page.locator('text=Select Total Asset').waitFor();
  await page.locator('text=Select Total Asset').click();
  await page.waitForTimeout(1000);
  await page.locator('text=<= 1M').click();

  //Check Source of Funds check box
  await page.waitForTimeout(1000);
  await page.locator('text=Salary').click(); // reliable and human-like

  // Save & Next
  await saveNextButton.waitFor();
  await saveNextButton.click();

  // RELATED PARTIES QUESTIONS
  // Click "No" for question1
  await page.locator('app-individual-relatedparties p-radiobutton[formcontrolname="question1"] >> label:has-text("No")').click();
  await page.locator('app-individual-relatedparties p-radiobutton[formcontrolname="question2"] >> label:has-text("No")').click();

  
  // Save & Next
  await saveNextButton.waitFor();
  await saveNextButton.click();

  // FATCA QUESTIONS
  // Click "No" for question1
  await page.locator('app-individual-fatca p-radiobutton[formcontrolname="question1"] >> label:has-text("No")').click();

  // Click "No" for question2
  await page.locator('app-individual-fatca p-radiobutton[formcontrolname="question2"] >> label:has-text("No")').click();

   // Save & Next
   await saveNextButton.waitFor();
   await saveNextButton.click();

   //Signature
   await page.getByRole('button', { name: 'Sign (3x) digitally' }).click();

   // Locate the canvas using class selector
const canvas = page.locator('canvas.signature-pad-canvas');

// Get its position and size
const box = await canvas.boundingBox();

if (box) {
  // Start drawing near the top-left of the canvas
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.down();

  // Draw a simple zigzag signature
  await page.mouse.move(box.x + 70, box.y + 40);
  await page.mouse.move(box.x + 120, box.y + 30);
  await page.mouse.move(box.x + 170, box.y + 50);
}
 // Save & Next
 await saveNextButton.waitFor();
 await saveNextButton.click();

 // Submit
 await page.getByRole('button', { name: 'Submit' }).waitFor();
 await page.getByRole('button', { name: 'Submit' }).click();
 
  // I Agree
  await page.getByRole('button', { name: 'I Agree' }).waitFor();
  await page.getByRole('button', { name: 'I Agree' }).click();

  //Step 4 Proceed
  await page.getByRole('button', { name: 'Proceed' }).waitFor();
  await page.getByRole('button', { name: 'Proceed' }).click();

  //ITF
  await page.getByRole('button', { name: 'Next' }).waitFor();
  await page.getByRole('button', { name: 'Next' }).click();

    //Step 5 Proceed
    await page.getByRole('button', { name: 'Proceed' }).waitFor();
    await page.getByRole('button', { name: 'Proceed' }).click();

    //Continue 2FA
    await page.getByRole('button', { name: 'Continue' }).waitFor();
    await page.getByRole('button', { name: 'Continue' }).click();


});