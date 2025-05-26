const { expect } = require('@playwright/test');

class OrderPage {

    constructor(page) {
        this.page = page;
        // Select product
        this.chooseProduct = page.locator("(//a[@id='anillos'])[1]");
        //this.selectProduct = page.locator("a[href*='ANI0843_PLATEADO_color=PLATEADO']");
        this.selectProduct = page.getByTitle('Anello placcato argento Sterling con tre sfere di varie dimensioni, Argent');
        this.sizeRing = page.locator('li[data-attr-value="15"]');
        this.addToCartButton = page.locator("button.add-to-cart").first();
        this.viewCartButton = page.locator("a[title='Visualizza carrello']");
        this.startOrder = page.locator('a[class="btn btn-primary btn-block "]');

        // Shipping
        this.standardShipping = page.locator('input[value="DHL002"]');
        this.shippingName = page.locator("#shippingFirstNamedefault");
        this.shippingSurname = page.locator("#shippingLastNamedefault");
        this.shippingAdress = page.locator("#shippingAddressOnedefault");
        this.shippingZipCode = page.locator("#shippingZipCodedefault");
        this.shippingPhone = page.locator("#shippingPhoneNumberdefault");
        this.shippingCityAdress = page.locator("#shippingAddressCitydefault");
        this.stateSelectOption = page.locator('#shippingStatedefault');
        this.privacySelectedCheckbox = page.locator('label[for="acceptprivacy"]');
        this.confirmShippingButton = page.locator('button[class="btn btn-primary submit-shipping"]');

        // Payment
        this.choosePaymentMethod = page.locator('li[data-method-id="AdyenComponent"]');
        this.cardNumberInputIFrame = page.frameLocator('iframe[title="Iframe per il numero di carta"]').locator(' input[data-fieldtype="encryptedCardNumber"]');
        this.cartExpirationDateInputIFrame = page.frameLocator('iframe[title="Iframe per data di scadenza"]').locator('input[placeholder="MM/AA"]');
        this.cvvCodeInputIFrame = page.frameLocator('iframe[title="Iframe per il codice di sicurezza"]').locator('input[data-fieldtype="encryptedSecurityCode"]');
        this.nameCard = page.locator('input[name="holderName"]');
        this.continueButton = page.locator('button[value="submit-payment"]');
        this.completeThePayment = page.locator('button[value="place-order"]');
    };

    async scrollToProduct(locator, maxScrolls = 10) {
        for (let i = 0; i < maxScrolls; i++) {
          if (await locator.first().isVisible()) return;
          await this.page.mouse.wheel(0, 500);
          await this.page.waitForTimeout(300);
        }
        throw new Error('Product not visible after scrolling');
    };

    async addProductToCart() {
       
        await this.chooseProduct.click();

        await this.scrollToProduct(this.selectProduct);

        await this.selectProduct.first().click();
        
        await this.sizeRing.waitFor({state: 'visible'});
        await this.sizeRing.click();

        const button = this.addToCartButton;
        await expect(button).toBeEnabled();
        await button.click();
        /* si può eseguire alternativamente a quello di cui sopra, anche questo tipo di controllo
        const isDisabled = await button.getAttribute('disabled');
        expect(isDisabled).toBeNull(); // se è null significa che non ha l'attributo e quindi il bottone è abilitato
        */

        await this.viewCartButton.click();
    };

    async startCheckout() {
        // Details order
        // Click button "Inizia l'ordine"
        await this.startOrder.click();
    };

    async fillShippingInformation({firstName, lastName, address, zipCode, phoneNumber, city, state}) {
        
        // Shipping side
        // Choose Standard Shipping
        await this.standardShipping.click();
        //Shipping option
        await this.shippingName.fill(firstName);
        await this.shippingSurname.fill(lastName);
        await this.shippingAdress.fill(address);
        await this.shippingZipCode.fill(zipCode);
        await this.shippingPhone.fill(phoneNumber);
        await this.shippingCityAdress.fill(city);
        //await this.page.selectOption('#shippingStatedefault', { value: 'Lombardia' });
        await this.stateSelectOption.selectOption({value: state})
        const selected = await this.page.locator("#shippingStatedefault").inputValue();
        // Verify province selected = Lombardia
        expect(selected).toBe('Lombardia');
        
        //const privacyCheckbox = this.privacySelectedCheckbox;
        //await privacyCheckbox.click();
        await this.privacySelectedCheckbox.click();

        await this.confirmShippingButton.click();
    };

    async executePayment() {

        // Payment Side
        // Choose Method Payment - card
        await this.choosePaymentMethod.click();

        // Enter your bank details
        /* N.B.
        You can’t write directly into the iframe because an iframe is not an input field - it’s a container for another HTML page.
        To solve the problem we will use page.frameLocator(). They are the official method and recommended by Playwright to interact with elements within iframe, they more stable than  
        page.frame(...) because it supports chaining methods such as locator().fill()
        */
        const cardNumberInput = this.cardNumberInputIFrame;
        await cardNumberInput.click();
        await cardNumberInput.fill('1234123412341234');

        await this.page.waitForSelector('iframe[title="Iframe per data di scadenza"]', { state: 'attached' });

        const cartExpirationDateInput = this.cartExpirationDateInputIFrame;

        await cartExpirationDateInput.waitFor({ state: 'visible', timeout: 10000 });
        await cartExpirationDateInput.click();
        await cartExpirationDateInput.fill('1234');

        await this.page.waitForSelector('iframe[title="Iframe per il codice di sicurezza"]', { state: 'attached' });

        const cvvCodeInput = this.cvvCodeInputIFrame;
        await cvvCodeInput.click();
        await cvvCodeInput.fill('123');

        const nameCart = this.nameCard;
        await nameCart.click();
        await nameCart.fill("Selene Palizzi");

        // Click "Continua" button

        await this.continueButton.click();

        // Click "Completa il pagamento" button

        await this.completeThePayment.click();
  };

}
module.exports = { OrderPage };