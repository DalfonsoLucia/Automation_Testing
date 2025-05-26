const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { LogoutPage } = require('./LogoutPage');
const { OrderPage } = require('./OrderPage');
const { FindStorePage } = require('./FindStorePage');
const { WishlistPage } = require('./WishlistPage');
const { SearchPage } = require('./SearchPage')

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.findStorePage = new FindStorePage(this.page);
        this.wishlistPage = new WishlistPage(this.page);
        this.searchPage = new SearchPage(this.page);
    };

    getLoginPage() {
        return this.loginPage;
    };

    getLogoutPage() {
        return this.logoutPage;
    };

    getCartPage() {
        return this.cartPage;
    };

    getOrderPage() {
        return this.orderPage;
    };

    getFindStorePage() {
        return this.findStorePage;
    };

    getWishlistPage() {
        return this.wishlistPage;
    };

    getSearchPage() {
        return this.searchPage;
    };
};
module.exports = { POManager };