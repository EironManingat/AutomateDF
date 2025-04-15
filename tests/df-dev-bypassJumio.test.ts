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
  await page.fill('input[formcontrolname="username"]', 'test@dragonfi.ph');
  
  // Type the password
  await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
  
  // Click the 'Sign In' button
  await page.getByRole('button', { name: 'Sign In' }).click();
  
 
  // Access local storage to get the token
  const tokenData = await page.evaluate(() => {
    // This gets the user object from local storage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      return {
        token: user.token,
        refreshToken: user.refreshToken
      };
    }
    return null;
  });
  
  // Log or use the token as needed
  console.log('Token:', tokenData?.token);
  console.log('Refresh Token:', tokenData?.refreshToken);
  
    // Navigate to the login page
  await page.goto('https://web-uat-rc.dragonfi.ph/login', { waitUntil: 'networkidle' });
  
  // Verify the "Log In" heading is visible
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  
  // Fill in login credentials and submit
  await page.fill('input[name="email"]', 'eiron.maningat+test94@dragonfi.ph');  // Replace with actual email
  await page.fill('input[name="password"]', 'Pass123!');
  await page.getByRole('button', { name: 'LOGIN' }).click();
 

    // Wait for navigation after login
    await page.waitForTimeout(2000);

    // Define the type for account data
    interface AccountData {
      accountCode: string | null;
      clientCode: string | null;
    }

    // Get account code and client code from local storage with retry logic
    let accountData: AccountData | null = null;
    let maxRetries = 10;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      console.log(`Attempt ${retryCount + 1} to retrieve account and client codes...`);
      
      accountData = await page.evaluate(() => {
        const accountCode = localStorage.getItem('accountCode');
        
        // Get the loginData which contains the client code
        const loginDataStr = localStorage.getItem('loginData');
        let clientCode = null;
        
        if (loginDataStr) {
          try {
            const loginData = JSON.parse(loginDataStr);
            clientCode = loginData.clientCode;
          } catch (e) {
            console.error('Error parsing loginData:', e);
          }
        }
        
        return {
          accountCode,
          clientCode
        };
      });
      
      // Make sure accountData isn't null before checking its properties
      if (!accountData || !accountData.accountCode || !accountData.clientCode) {
        console.log('Missing data:', {
          dataExists: !!accountData,
          accountCodeExists: accountData ? !!accountData.accountCode : false,
          clientCodeExists: accountData ? !!accountData.clientCode : false
        });
        // Wait before trying again
        await page.waitForTimeout(1000);
        retryCount++;
      } else {
        // We have all the data we need
        break;
      }
    }

    // Final check after attempts
    if (!accountData || !accountData.accountCode || !accountData.clientCode) {
      throw new Error(`Failed to retrieve required data after ${maxRetries} attempts.`);
    }

    // Log the account code and client code
    console.log('Account Code:', accountData.accountCode); 
    console.log('Client Code:', accountData.clientCode);


  //Go to swagger
  await page.goto('https://atlas-uat.dragonfi.ph/docs/index.html', { waitUntil: 'networkidle' });

  await page.click('button.btn.authorize.unlocked');

  //input token
  if (tokenData?.token) {
    await page.fill('input[aria-label="auth-bearer-value"]', tokenData.token);
  } else {
    console.log('Token not found!');
  }

  await page.click('button.btn.modal-btn.auth.authorize.button');
  await page.click('button.btn.modal-btn.auth.btn-done.button');

  //navigate to VerifyProfileV2 API
  await page.click('button[aria-label="put ​/api​/Accounts​/VerifyProfileV2"]');

  //try it out
  await page.click('button.btn.try-out__btn');

//fill the input
await page.fill('input[placeholder="password"]', 'P@ssw0rd');

if (accountData.clientCode) {
  await page.fill('input[placeholder="clientCode"]', accountData.clientCode);
} else {
  throw new Error('clientCode is null');
}

if (accountData.accountCode) {
  await page.fill('input[placeholder="accountCode"]', accountData.accountCode);
} else {
  throw new Error('accountCode is null');
}

//Execute the API
await page.click('.btn.execute.opblock-control__btn');

//COMPLIANCE OFFICER APPROVAL OF ACCOUNT

  // Navigate to the login page of ATLAS CMS
  await page.goto('https://atlas-uat.dragonfi.ph/#/login', { waitUntil: 'networkidle' });

  // Fill the username input field
  await page.fill('input[formcontrolname="username"]', 'complianceofficer@dragonfi.ph');
  
  // Type the password
  await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
  
  // Click the 'Sign In' button
  await page.getByRole('button', { name: 'Sign In' }).click();


    // Approve Bypassed account via compliance staff 
    await page.goto('https://atlas-uat.dragonfi.ph/#/login', { waitUntil: 'networkidle' });

    // Fill the username input field
    await page.fill('input[formcontrolname="username"]', 'test@dragonfi.ph');
    
    // Type the password
    await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
    
    // Click the 'Sign In' button
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.locator('li.layout-root-menuitem:has(span:text-is("Clients"))').click();

    await page.locator('a:has(span:text-is("New Accounts for Approval"))').click();

    await page.getByText(accountData.accountCode).click();

    await page.getByRole('button', { name: 'Submit for approval' }).click();

    await page.getByRole('button', { name: 'Accept request' }).click();

    await page.waitForTimeout(1000);

    // Approve Bypassed account via  compliance officer
    await page.goto('https://atlas-uat.dragonfi.ph/#/login', { waitUntil: 'networkidle' });

    // Fill the username input field
    await page.fill('input[formcontrolname="username"]', 'complianceofficer@dragonfi.ph');
    
    // Type the password
    await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
    
    // Click the 'Sign In' button
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.locator('li.layout-root-menuitem:has(span:text-is("Clients"))').click();

    await page.locator('a:has(span:text-is("New Accounts for Approval"))').click();

    await page.getByText(accountData.accountCode).click();

    await page.getByRole('button', { name: 'Approve' }).click();

    await page.getByRole('button', { name: 'Accept request' }).click();

    await page.waitForTimeout(1000);

    // Check account if 0 balance
    await page.goto('https://web-uat-rc.dragonfi.ph/login', { waitUntil: 'networkidle' });
    
    // Verify the "Log In" heading is visible
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
    
    // Fill in login credentials and submit
    await page.fill('input[name="email"]', 'eiron.maningat+test94@dragonfi.ph');  // Replace with actual email
    await page.fill('input[name="password"]', 'Pass123!');
    await page.getByRole('button', { name: 'LOGIN' }).click();
    await page.fill('#otp', '123123'); 
    await page.getByRole('button', { name: 'VERIFY' }).click();

    // Check if "Available to Withdraw" section is visible with its value
    await expect(page.locator('p.dsi-dashboard-available__label:has-text("Available to Withdraw")')).toBeVisible();
    await expect(page.locator('p.dsi-dashboard-available__value:has-text("₱0.00")')).toBeVisible();

    // For "Available to Trade" section
    const tradeSection = page.locator('div').filter({ hasText: 'Available to Trade' }).first();
    await expect(tradeSection).toBeVisible();
    await expect(tradeSection.getByText('₱0.00')).toBeVisible();

    // For "Available to Withdraw" section
    const withdrawSection = page.locator('div').filter({ hasText: 'Available to Withdraw' }).first();
    await expect(withdrawSection).toBeVisible();
    await expect(withdrawSection.getByText('₱0.00')).toBeVisible();

});