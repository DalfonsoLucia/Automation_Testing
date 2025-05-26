const {test, expect} = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.beforeEach(async ({page}) => {

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();    
    await loginPage.goto();

});

//pulire codice di questo test + Order page con i commenti inseriti

test("make a order after login", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "make a order"});

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();
    const orderPage = pomManager.getOrderPage();
    
    await loginPage.acceptCookie();
    await loginPage.declinePopUpNewSubscribers();
    await loginPage.clickAccountIcon();

    await expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    await loginPage.loginAccount();

    /*const datiPersonali = page.locator('h2[class="pull-left profile-header"]');
    const text = await datiPersonali.textContent();
    console.log(text);*/

    await expect(page.locator('h2[class="pull-left profile-header"]')).toContainText("I miei dati personali");

    await loginPage.goBackHomapage();

    //await orderPage.createOrder();
    await orderPage.addProductToCart();
    await orderPage.startCheckout();

    //await orderPage.insertShippingInformation();
    await orderPage.fillShippingInformation({firstName: 'Selene', 
    lastName: 'Palizzi', 
    address: 'Via Quintino Sella, 10', 
    zipCode: '21052', 
    phoneNumber: '3276131745', 
    city: 'Busto Arsizio',
    state: 'Lombardia'});

    await orderPage.executePayment();

    /*Here the test is interrupted because we proceed with the payment to the bank
    for approval and closure of the order, for obvious security reasons will not proceed further*/
})