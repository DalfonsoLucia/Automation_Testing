import { Locator, Page, expect } from "@playwright/test";

export class OrderPage {

    
    page: Page
    buttonOrder: Locator
    orderSchema: Locator
    orderRows: Locator
    orderIdContained: Locator
    orderDetails: Locator
    

    constructor(page:Page) {

        this.page = page;
        this.buttonOrder = page.locator("button[routerlink*='myorders']");
        this.orderSchema = page.locator("tbody");
        this.orderRows = page.locator("tbody tr");
        this.orderIdContained = page.locator(".ng-star-inserted .table-bordered ");
        this.orderDetails = page.locator(".col-text");

    }

    async myOrder() {
        await this.buttonOrder.click();
    }

    async myOrderSchema() {
        await this.orderSchema.waitFor();
    }

    async orderRowsSelector() {

        this.orderRows;
    }

    async OrderIdContent() {
        await this.orderIdContained.textContent();
    }

    async viewButton() {
        const rows: Locator = await this.orderRows;
        const orderId: any = await this.orderIdContained.textContent();
        console.log(orderId);

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async orderDetailsContent() {

        return await this.orderDetails.textContent();
    }

    async verifyOrder() {
        const orderIdCont: any = await this.orderIdContained.textContent();
        const orderIdDetails: any = await this.orderDetails.textContent();

        expect(orderIdCont.includes(orderIdDetails)).toBeTruthy();
    }

}

module.exports = { OrderPage }