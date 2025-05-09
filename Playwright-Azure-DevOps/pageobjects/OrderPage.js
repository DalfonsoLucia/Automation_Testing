const { expect } = require('@playwright/test');

class OrderPage {

    constructor(page) {

        this.page = page;
        this.buttonOrder = page.locator("button[routerlink*='myorders']");
        this.orderSchema = page.locator("tbody");
        this.orderRows = page.locator("tbody tr");
        this.orderIdContained = page.locator(".ng-star-inserted .table-bordered");
        this.orderDetails = page.locator(".col-text");

    }

    async myOrder() {
        await this.buttonOrder.click();
    }

    async myOrderSchema() {
        await this.page.waitForSelector("tbody tr", { state: "attached", timeout: 10000 });
    }

    async orderRowsSelector() {

        this.orderRows;
    }

    async OrderIdContent() {
        await this.orderIdContained.textContent();
    }

    async viewButton() {
        const rows = this.orderRows;
        const orderId = await this.orderIdContained.textContent();
        console.log(`Order ID trovato: ${orderId}`);

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            console.log(`Verifica ordine nella riga ${i}: ${rowOrderId}`);
            if (orderId.includes(rowOrderId.trim())) {
                console.log("Ordine trovato, clicco su View");
                await this.orderRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async orderDetailsContent() {

        return await this.orderDetails.textContent();
    }

    async verifyOrder() {
        await this.orderIdContained.waitFor({ state: "visible", timeout: 5000 });
        await this.orderDetails.waitFor({ state: "visible", timeout: 5000 });

        const orderIdCont = await this.orderIdContained.textContent();
        const orderIdDetails = await this.orderDetails.textContent();

        console.log(`Confronto: "${orderIdCont.trim()}" con "${orderIdDetails.trim()}"`);

        //expect(await orderIdCont.includes(orderIdDetails)).toBeTruthy();
        expect(orderIdCont.trim()).toContain(orderIdDetails.trim());
    }

    /*async verifyOrder() {
        console.log(" Aspetto che l'ID ordine sia visibile...");
        await this.orderIdContained.waitFor({ state: "visible", timeout: 100000 });
    
        console.log("⌛ Aspetto che i dettagli dell'ordine siano visibili...");
        await this.orderDetails.waitFor({ state: "visible", timeout: 10000 });
    
        const orderIdCont = (await this.orderIdContained.textContent()).trim();
        const orderIdDetails = (await this.orderDetails.textContent()).trim();
    
        console.log(`🔄 Confronto: "${orderIdCont}" con "${orderIdDetails}"`);
    
        if (!orderIdCont || !orderIdDetails) {
            throw new Error("❌ Uno dei valori è vuoto!");
        }
    
        expect(orderIdCont).toBeTruthy(orderIdDetails);
    }*/
    
}

module.exports = { OrderPage }