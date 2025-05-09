import { Page } from "@playwright/test";

import { LoginPage } from './LoginPage';
import { DashBoardPage } from './DashBoardPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderPage } from './OrderPage';
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";

export class POManager {

    page: Page
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    orderPage: OrderPage;
    ordersHistoryPage: OrdersHistoryPage;
    ordersRewiewPage: OrdersReviewPage;


    constructor(page:Page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page)
        this.ordersRewiewPage = new OrdersReviewPage(this.page)

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

    getorderRewiewPage() {
        return this.ordersRewiewPage;
    }


}
module.exports = {POManager}