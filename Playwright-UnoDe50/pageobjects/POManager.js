const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { LogoutPage } = require('./LogoutPage');
const { OrderPage } = require('./OrderPage');
const { FindStorePage } = require('./FindStorePage');

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.findStorePage = new FindStorePage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getLogoutPage() {
        return this.logoutPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrderPage() {
        return this.orderPage;
    }

    getFindStorePage() {
        return this.findStorePage;
    }

};
module.exports = { POManager };