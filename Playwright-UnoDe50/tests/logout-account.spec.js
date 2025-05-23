const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {

    await page.goto("https://www.unode50.com/eu/it_IT/home");

});


test("Logout account", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Logout Test"});

    await page.locator("#onetrust-accept-btn-handler").click();

    await page.locator("#close-popup").click();

    await page.locator("a.hidden-xs-down").click()

    expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    await page.locator("#login-form-email").fill("selene_venus_in_the_sky@outlook.it");
    await page.locator("#login-form-password").fill("Venusinthesky89!");

    await page.locator(".custom-checkbox.remember-me").click();

    await page.locator("form[name='login-form'] button[type='submit']").click();

    await expect(page.locator('h2[class="pull-left profile-header"]')).toContainText("I miei dati personali");

    page.locator('a[class="logo-home"]').click();

    await page.locator("div[id='myaccount']").click();

    await page.locator("a[role='menuitem'][href*='Login-Logout']").click();

    // Verify that the disconnect was successful
    const loginLink = page.locator('a[aria-label="Accedi al tuo account"]');
    await expect(loginLink).toBeVisible();
    const userName = page.locator('#myaccount .user-message');
    await expect(userName).toHaveCount(0);
    const userAccount = page.locator('#myaccount');
    await expect(userAccount).toHaveCount(0);
});


