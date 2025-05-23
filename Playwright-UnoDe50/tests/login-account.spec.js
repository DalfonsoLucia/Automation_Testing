const {test, expect} = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.beforeEach(async ({page}) => {

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();    
    await loginPage.goto();

});

test('Accept all cookies and login account', async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Login Test"});

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();
    
    // Accept "Accept all cookies"
    await loginPage.acceptCookie();

    // Close pop up "new subscribers"
    await loginPage.declinePopUpNewSubscribers();

    // Click Account icon
    //await page.getByLabel("Accedi al tuo account").click(); //Possiamo usare 'getByLabel("...") di Playwright o .locator("...")
    //await page.locator("a.hidden-xs-down").click()
    await loginPage.clickAccountIcon();

    /*const logInTab = page.locator('[aria-controls="login"]')
    const logInText = await logInTab.innerText()
    console.log(logInText)*/

    // Check that we are in the login page 
    await expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    // Login Account
    await loginPage.loginAccount();

    
    // Assertion to verify the login made successfully
    // Different type of assertions
    // expect(page.locator('h2[class="pull-left profile-header"]')).toHaveText("I miei dati personali");
    // expect(page.locator('h2[class="pull-left profile-header"]')).toBeVisible("I miei dati personali");
    await expect(page.locator('h2[class="pull-left profile-header"]')).toContainText("I miei dati personali");
});