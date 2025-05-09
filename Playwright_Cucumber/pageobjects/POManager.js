const { LoginPage } = require('./LoginPage');
const { DashBoardPage } = require('./DashBoardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderPage } = require('./OrderPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { LogoutPage } = require('./LogoutPage');

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page)
        this.ordersReviewPage = new OrdersReviewPage(this.page)
        this.logoutPage = new LogoutPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashBoardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderPage() {
        return this.orderPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getLogoutPage() {
        return this.logoutPage;
    }

}

module.exports = { POManager }