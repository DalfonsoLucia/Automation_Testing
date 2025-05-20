const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {

    page.goto("https://www.unode50.com/eu/it_IT/home");

});

test('Accept all cookies and login account', async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Login Test"})
    
    // Accept "Accept all cookies"
    await page.locator("#onetrust-accept-btn-handler").click();

    // Close pop up "new subscribers"
    await page.locator("#close-popup").click();

    // Click Account icon
    //await page.getByLabel("Accedi al tuo account").click(); //Possiamo usare 'getByLabel("...") di Playwright o .locator("...")
    await page.locator("a.hidden-xs-down").click()

    /*const logInTab = page.locator('[aria-controls="login"]')
    const logInText = await logInTab.innerText()
    console.log(logInText)*/

    // Check that we are in the login page 
    expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    // Login Account
    await page.locator("#login-form-email").fill("selene_venus_in_the_sky@outlook.it");
    await page.locator("#login-form-password").fill("Venusinthesky89!");

    // Click checkbox "Remember Me"
    await page.locator(".custom-checkbox.remember-me").click();

    //Click "Accedi" button
    await page.locator("form[name='login-form'] button[type='submit']").click();

    
    // Assertion to verify the login made successfully
    // Different type of assertions
    // expect(page.locator('h2[class="pull-left profile-header"]')).toHaveText("I miei dati personali");
    // expect(page.locator('h2[class="pull-left profile-header"]')).toBeVisible("I miei dati personali");
    expect(page.locator('h2[class="pull-left profile-header"]')).toContainText("I miei dati personali");
});