const {test, expect} = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager')

test.beforeEach(async ({page}) => {

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();    
    await loginPage.goto();
    
});

test("Logout account", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Logout Test"});

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();
    const logoutPage = pomManager.getLogoutPage();
    
    await loginPage.acceptCookie();
    await loginPage.declinePopUpNewSubscribers();
    await loginPage.clickAccountIcon();

    expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    await loginPage.loginAccount();

    await expect(page.locator('h2[class="pull-left profile-header"]')).toContainText("I miei dati personali");

    await loginPage.goBackHomapage();

    await logoutPage.logIntoAccountpage();

    await logoutPage.clickLogoutOption();

    // Verify that the disconnect was successful
    const loginLink = page.locator('a[aria-label="Accedi al tuo account"]');
    await expect(loginLink).toBeVisible();
    const userName = page.locator('#myaccount .user-message');
    await expect(userName).toHaveCount(0);
    const userAccount = page.locator('#myaccount');
    await expect(userAccount).toHaveCount(0);
});


