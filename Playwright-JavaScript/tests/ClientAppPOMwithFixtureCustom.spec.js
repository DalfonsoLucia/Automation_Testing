const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');

const dataSet = require('../utils/PlaceholderTestData.json');

customtest(`Web Client App Login and make a Order`, async ({ page, testDataOrder }) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const dashBoardPage = poManager.getDashBoardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();

    const creditCard = "1245 7845 5689 5687";
    const mounth = "02";
    const day = "20";
    const cvvCode = "345";
    const nameCard = "Lucy D.A. Stone";
    const countryCode = "Ita";
    const contryName = " France Metropolitan";

    const orderCompletedText = " Thankyou for the order. ";


    await loginPage.goTo();
    await loginPage.validLogin(testDataOrder.email, testDataOrder.password);

    await dashBoardPage.searchProductAddCart(testDataOrder.productName);
    await dashBoardPage.navigateToCart();

    await cartPage.verifyProductIsDisplayed(testDataOrder.productName);


    await cartPage.insertPersonalInformation(mounth, day, cvvCode, nameCard, creditCard);
    await cartPage.insertShippingInformation(countryCode, contryName);

    await checkoutPage.assertOrderText;
    await checkoutPage.checkoutLastPage(orderCompletedText);

    //await page.pause();
});

test(`Search ID Order in My Orders Tab with ${dataSet[0].email}`, async ({ page }) => {
    console.log("Email:", dataSet[0].email);
    console.log("Password:", dataSet[0].password);
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const orderPage = poManager.getOrderPage();

    await loginPage.goTo();
    await loginPage.validLogin(dataSet[0].email, dataSet[0].password);

    await orderPage.myOrder();
    await orderPage.myOrderSchema();

    orderPage.viewButton();

    orderPage.verifyOrder();


    //await page.pause();
});

