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
  await page.goto('https://web-dev-rc.dragonfi.ph/login', { waitUntil: 'networkidle' });
  
  // Verify the "Log In" heading is visible
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  
  // Fill in login credentials and submit
  await page.fill('input[name="email"]', 'eiron.maningat+test302@dragonfi.ph');
  await page.fill('input[name="password"]', 'Pass123!');
  await page.getByRole('button', { name: 'LOGIN' }).click();

    // Wait for navigation after login
    await page.waitForTimeout(2000);

    // Get account code and client code from local storage
    const accountData = await page.evaluate(() => {
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
    
    // Log the account code and client code
    console.log('Account Code:', accountData.accountCode); 
    console.log('Client Code:', accountData.clientCode); 


  //Go to swagger
  await page.goto('https://atlas-dev.dragonfi.ph/docs/index.html', { waitUntil: 'networkidle' });

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
  await page.goto('https://atlas-dev.dragonfi.ph/#/login', { waitUntil: 'networkidle' });

  // Fill the username input field
  await page.fill('input[formcontrolname="username"]', 'complianceofficer@dragonfi.ph');
  
  // Type the password
  await page.fill('input[placeholder="Password"]', 'P@ssw0rd');
  
  // Click the 'Sign In' button
  await page.getByRole('button', { name: 'Sign In' }).click();

});