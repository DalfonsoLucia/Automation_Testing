const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { LogoutPage } = require('./LogoutPage');
const { OrderPage } = require('./OrderPage');

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
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

};