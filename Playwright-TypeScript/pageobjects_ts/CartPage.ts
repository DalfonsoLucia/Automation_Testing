import { expect, Locator, Page } from '@playwright/test';

export class CartPage {

    page: Page;
    productCart: Locator;
    productCartText: Locator;
    checkoutButton: Locator;
    creditCard: Locator;
    month: Locator;
    day: Locator;
    cvvCode: Locator;
    nameCard: Locator;
    country: Locator;
    dropdown: Locator;
    placeholderButton: Locator;

    constructor(page: Page) {

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

    getProductLocator(productName: string) {
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async verifyProductIsDisplayed(productName: string) {
        
        await this.productCart.first().waitFor();
        const visibleProduct = await this.getProductLocator(productName).isVisible();
        await expect(visibleProduct).toBeTruthy();

    }

    async insertPersonalInformation(month: string, day: string, cvvCode: string, nameCard: string, codeCreditCard: string) {

        await this.checkoutButton.click();
        await this.creditCard.fill(codeCreditCard);
        await this.month.selectOption(month)
        await this.day.selectOption(day);
        await this.cvvCode.fill(cvvCode);
        await this.nameCard.fill(nameCard)
    }

    async insertShippingInformation(countryCode: string, countryName: string) {
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

}
module.exports = { CartPage };