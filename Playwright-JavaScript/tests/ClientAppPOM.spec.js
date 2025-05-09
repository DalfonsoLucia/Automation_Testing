const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

const dataSet = require('../utils/PlaceholderTestData.json');
//const dataSet = JSON.parse(JSON.stringify(require('../utils/PlaceholderTestData.json')));

for (const data of dataSet) {

    test(`@Web Client App Login, add ${data.productName} to Cart and make a Order`, async ({ page }) => {

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
        await loginPage.validLogin(data.email, data.password);

        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();

        await cartPage.verifyProductIsDisplayed(data.productName);


        await cartPage.insertPersonalInformation(mounth, day, cvvCode, nameCard, creditCard);
        await cartPage.insertShippingInformation(countryCode, contryName);

        await checkoutPage.assertOrderText();
        await checkoutPage.checkoutLastPage(orderCompletedText);

        //await page.pause();
    });

    test(`Search ID Order in My Orders Tab with ${data.email}`, async ({ page }) => {
        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        const orderPage = poManager.getOrderPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);

        await orderPage.myOrder();
        await orderPage.myOrderSchema();

        orderPage.viewButton();

        orderPage.verifyOrder();


        //await page.pause();
    });
}
