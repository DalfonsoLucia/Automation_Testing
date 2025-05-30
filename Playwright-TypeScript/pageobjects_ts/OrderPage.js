"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPage = void 0;
var test_1 = require("@playwright/test");
var OrderPage = /** @class */ (function () {
    function OrderPage(page) {
        this.page = page;
        this.buttonOrder = page.locator("button[routerlink*='myorders']");
        this.orderSchema = page.locator("tbody");
        this.orderRows = page.locator("tbody tr");
        this.orderIdContained = page.locator(".ng-star-inserted .table-bordered ");
        this.orderDetails = page.locator(".col-text");
    }
    OrderPage.prototype.myOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buttonOrder.click()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderPage.prototype.myOrderSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderSchema.waitFor()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderPage.prototype.orderRowsSelector = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.orderRows;
                return [2 /*return*/];
            });
        });
    };
    OrderPage.prototype.OrderIdContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderIdContained.textContent()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderPage.prototype.viewButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, orderId, i, _a, rowOrderId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.orderRows];
                    case 1:
                        rows = _b.sent();
                        return [4 /*yield*/, this.orderIdContained.textContent()];
                    case 2:
                        orderId = _b.sent();
                        console.log(orderId);
                        i = 0;
                        _b.label = 3;
                    case 3:
                        _a = i;
                        return [4 /*yield*/, rows.count()];
                    case 4:
                        if (!(_a < (_b.sent()))) return [3 /*break*/, 8];
                        return [4 /*yield*/, rows.nth(i).locator("th").textContent()];
                    case 5:
                        rowOrderId = _b.sent();
                        if (!orderId.includes(rowOrderId)) return [3 /*break*/, 7];
                        return [4 /*yield*/, rows.nth(i).locator("button").first().click()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ++i;
                        return [3 /*break*/, 3];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderPage.prototype.orderDetailsContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDetails.textContent()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderPage.prototype.verifyOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orderIdCont, orderIdDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderIdContained.textContent()];
                    case 1:
                        orderIdCont = _a.sent();
                        return [4 /*yield*/, this.orderDetails.textContent()];
                    case 2:
                        orderIdDetails = _a.sent();
                        (0, test_1.expect)(orderIdCont.includes(orderIdDetails)).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OrderPage;
}());
exports.OrderPage = OrderPage;
module.exports = { OrderPage: OrderPage };
