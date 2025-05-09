const { expect } = require("@playwright/test");

class CheckoutPage {

    constructor(page) {
        
        this.page = page;
        this.orderCompletedText = page.locator(".hero-primary");
        this.orderIdNumber = page.locator(".em-spacer-1 .ng-star-inserted");

    }

    async assertOrderText() {
        
        expect(this.orderCompletedText).toHaveText(" Thankyou for the order. ");
    }

    async checkoutLastPage() {
        
        const idOrder = await this.orderIdNumber.textContent();
        console.log(idOrder);
    }

    

}
module.exports = {CheckoutPage}