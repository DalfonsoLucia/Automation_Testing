import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {

    page: Page
    orderCompletedText: Locator
    orderIdNumber:Locator

    constructor(page: Page) {
        
        this.page = page;
        this.orderCompletedText = page.locator(".hero-primary");
        this.orderIdNumber = page.locator(".em-spacer-1 .ng-star-inserted");

    }

    async assertOrderText(orderCompletedText: string) {
        
        expect(this.orderCompletedText).toHaveText(orderCompletedText);
    }

    async checkoutLastPage() {
        
        const idOrder = await this.orderIdNumber.textContent();
        console.log(idOrder);
    }

}
module.exports = {CheckoutPage}