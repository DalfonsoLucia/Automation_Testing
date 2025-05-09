const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {

        this.page = page;
        this.productCart = page.locator("div li")
        this.productCartText = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkoutButton = page.locator("text=Checkout");
        this.creditCard = page.locator("[type='text']").nth(0);
        this.month = page.locator(".ddl").nth(0);
        this.day = page.locator(".ddl").nth(1);
        this.cvvCode = page.locator("[type='text']").nth(1);
        this.nameCard = page.locator("[type='text']").nth(2);
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.placeholderButton = page.locator(".action__submit");

    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async verifyProductIsDisplayed(productName) {
        
        await this.productCart.first().waitFor();
        const visibleProduct = await this.getProductLocator(productName).isVisible();
        await expect(visibleProduct).toBeTruthy();

    }

    async insertPersonalInformation(month, day, cvvCode, nameCard, codeCreditCard) {

        await this.checkoutButton.click();
        await this.creditCard.fill(codeCreditCard);
        await this.month.selectOption(month)
        await this.day.selectOption(day);
        await this.cvvCode.fill(cvvCode);
        await this.nameCard.fill(nameCard)
    }

    async insertShippingInformation(countryCode, countryName) {
        await this.country.pressSequentially(countryCode, { delay: 100 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
        this.placeholderButton.click();
    }

    async checkoutButtonClick() {
        this.checkoutButton.click();
    }

}
module.exports = { CartPage };