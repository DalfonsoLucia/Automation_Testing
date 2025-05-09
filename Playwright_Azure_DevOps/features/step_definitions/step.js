/*const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

Given('A login to Ecommerce application with {string} and {string}',  async function (email, password) {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(email, password);
});

When('Add {string} to Cart', async function (productName) {

    const dashBoardPage = this.poManager.getDashBoardPage();

    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.navigateToCart();
    
});

Then('Verify {string} is displayed in the Cart', async function (productName) {

    const cartPage = this.poManager.getCartPage();    

    await cartPage.verifyProductIsDisplayed(productName);
    
});

When('Enter valid details and Place the Order',  async function () {

    const cartPage = this.poManager.getCartPage();
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    const dashBoardPage = this.poManager.getDashBoardPage();

    await cartPage.checkoutButtonClick();

    const codeCreditCard = "1245 7845 5689 5687";
    const mounth = "02";
    const day = "20";
    const cvvCode = "345";
    const nameCard = "Lucy D.A. Stone";
    const countryCode = "Ita";
    const countryName = " France Metropolitan";


    await cartPage.insertPersonalInformation(mounth, day, cvvCode, nameCard, codeCreditCard);
    
    await cartPage.insertShippingInformation(countryCode, countryName);

    this.orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(this.orderId);

    await dashBoardPage.navigateOrders();
    console.log("sono in Orders");
});

Then('Verify order in present in the OrderHistory', async function () {

    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    
});

Then('Close Ecommerce', async function () {
    //const logoutPage = this.poManager.getLogoutPage();

    //await logoutPage.signOut();
});*/
