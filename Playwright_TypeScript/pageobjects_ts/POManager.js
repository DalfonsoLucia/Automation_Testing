"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POManager = void 0;
var LoginPage_1 = require("./LoginPage");
var DashBoardPage_1 = require("./DashBoardPage");
var CartPage_1 = require("./CartPage");
var CheckoutPage_1 = require("./CheckoutPage");
var OrderPage_1 = require("./OrderPage");
var OrdersHistoryPage_1 = require("./OrdersHistoryPage");
var OrdersReviewPage_1 = require("./OrdersReviewPage");
var POManager = /** @class */ (function () {
    function POManager(page) {
        this.page = page;
        this.loginPage = new LoginPage_1.LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage_1.DashBoardPage(this.page);
        this.cartPage = new CartPage_1.CartPage(this.page);
        this.checkoutPage = new CheckoutPage_1.CheckoutPage(this.page);
        this.orderPage = new OrderPage_1.OrderPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage_1.OrdersHistoryPage(this.page);
        this.ordersRewiewPage = new OrdersReviewPage_1.OrdersReviewPage(this.page);
    }
    POManager.prototype.getLoginPage = function () {
        return this.loginPage;
    };
    POManager.prototype.getDashBoardPage = function () {
        return this.dashBoardPage;
    };
    POManager.prototype.getCartPage = function () {
        return this.cartPage;
    };
    POManager.prototype.getCheckoutPage = function () {
        return this.checkoutPage;
    };
    POManager.prototype.getOrderPage = function () {
        return this.orderPage;
    };
    POManager.prototype.getOrdersHistoryPage = function () {
        return this.ordersHistoryPage;
    };
    POManager.prototype.getorderRewiewPage = function () {
        return this.ordersRewiewPage;
    };
    return POManager;
}());
exports.POManager = POManager;
module.exports = { POManager: POManager };
