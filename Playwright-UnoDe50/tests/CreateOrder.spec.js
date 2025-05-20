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

test("make a order after login", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "make a order"})

    await page.locator("#onetrust-accept-btn-handler").click();
    await page.locator("#close-popup").click();
    await page.locator("a.hidden-xs-down").click()


    await page.locator("#login-form-email").fill("selene_venus_in_the_sky@outlook.it");
    await page.locator("#login-form-password").fill("Venusinthesky89!");

    await page.locator(".custom-checkbox.remember-me").click();
    await page.locator("form[name='login-form'] button[type='submit']").click();

    /*const datiPersonali = page.locator('h2[class="pull-left profile-header"]');
    const text = await datiPersonali.textContent();
    console.log(text);*/

    await expect(page.locator('h2[class="pull-left profile-header"]')).toContainText("I miei dati personali");

    await page.locator('a[class="logo-home"]').click()

    await page.locator("(//a[@id='anillos'])[1]").click();
    
    await page.getByTitle("Anello placcato argento Sterling con tre sfere di varie dimensioni, Argent").click()

    await page.locator('li[data-attr-value="15"]').click()

    const button = page.locator("button.add-to-cart");
    await expect(button).toBeEnabled();
    await button.click();
    /* si può eseguire alternativamente a quello di cui sopra, anche questo tipo di controllo
    const isDisabled = await button.getAttribute('disabled');
    expect(isDisabled).toBeNull(); // se è null significa che non ha l'attributo e quindi il bottone è abilitato
    */

    await page.locator("a[title='Visualizza carrello']").click();

    // Details order
    // Click button "Inizia l'ordine"
    await page.locator('a[class="btn btn-primary btn-block "]').click();

    // Shipping side
    // Choose Standard Shipping
    await page.locator('input[value="DHL002"]').click();
    //Shipping option
    await page.locator("#shippingFirstNamedefault").fill("Selene");
    await page.locator("#shippingLastNamedefault").fill("Palizzi");
    await page.locator("#shippingAddressOnedefault").fill("Via Quintino Sella, 10");
    await page.locator("#shippingZipCodedefault").fill("21052");
    await page.locator("#shippingPhoneNumberdefault").fill("3276131745");
    await page.locator("#shippingAddressCitydefault").fill("Busto Arsizio");
    await page.selectOption('#shippingStatedefault', { value: 'Lombardia' });
    const selected = await page.locator("#shippingStatedefault").inputValue();
    // Verify province selected = Lombardia
    expect(selected).toBe('Lombardia');
    
    const privacyCheckbox = page.locator('label[for="acceptprivacy"]')
    await privacyCheckbox.click()

    await page.locator('button[class="btn btn-primary submit-shipping"]').click()

    // Payment Side
    // Choose Method Payment - card
    await page.locator('li[data-method-id="AdyenComponent"]').click()

    // Enter your bank details
    /* N.B.
    You can’t write directly into the iframe because an iframe is not an input field - it’s a container for another HTML page.
    To solve the problem we will use page.frameLocator(). They are the official method and recommended by Playwright to interact with elements within iframe, they more stable than  
    page.frame(...) because it supports chaining methods such as locator().fill()
    */
    const cardNumberInput = page.frameLocator('iframe[title="Iframe per il numero di carta"]').locator(' input[data-fieldtype="encryptedCardNumber"]');
    await cardNumberInput.click();
    await cardNumberInput.fill('1234123412341234');

    await page.waitForSelector('iframe[title="Iframe per data di scadenza"]', { state: 'attached' });

    const cartExpirationDateInput = page.frameLocator('iframe[title="Iframe per data di scadenza"]').locator('input[placeholder="MM/AA"]');

    await cartExpirationDateInput.waitFor({ state: 'visible', timeout: 10000 });
    await cartExpirationDateInput.click();
    await cartExpirationDateInput.fill('1234');

    await page.waitForSelector('iframe[title="Iframe per il codice di sicurezza"]', { state: 'attached' });

    const cvvCodeInput = page.frameLocator('iframe[title="Iframe per il codice di sicurezza"]').locator('input[data-fieldtype="encryptedSecurityCode"]');
    await cvvCodeInput.click();
    await cvvCodeInput.fill('123');

    const nameCart = page.locator('input[name="holderName"]');
    await nameCart.click()
    await nameCart.fill("Selene Palizzi")

    // Click "Continua" button

    page.locator('button[value="submit-payment"]').click();

    // Click "Completa il pagamento" button

    page.locator('button[value="place-order"]').click()

    /*Here the test is interrupted because we proceed with the payment to the bank
    for approval and closure of the order, for obvious security reasons will not proceed further*/
})