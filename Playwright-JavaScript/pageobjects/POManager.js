const { LoginPage } = require('./LoginPage');
const { DashBoardPage } = require('./DashBoardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderPage } = require('./OrderPage');

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderPage = new OrderPage(this.page);

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


}
module.exports = {POManager}