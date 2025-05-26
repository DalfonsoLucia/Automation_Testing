const { expect } = require('@playwright/test');

class SearchPage {

    constructor(page) {
        this.page = page;
        this.searchIcon = page.locator('i.icon-search-action');
        this.searchInputField = this.page.locator('input.search-field');
        this.searchDesiredProduct = page.locator('img[src*="ANI0572MTL000_2.jpg"]');
        this.sizeDesiredProduct = page.locator('li[data-attr-value="15"]');
        this.wishlistButton = page.locator('button[data-href*="Wishlist-AddProduct"]');
        this.addProdToWishlist = page.locator('span[title="Wishlist"]');
        this.productName = page.locator('h1[class="product-name"]');

    };

    async scrollToProduct(locator, maxScrolls = 10) {
        for (let i = 0; i < maxScrolls; i++) {
          if (await locator.first().isVisible()) return;
          await this.page.mouse.wheel(0, 600);
          await this.page.waitForTimeout(600);
        }
        throw new Error('Product not visible after scrolling');
    };

    async insertItemToSearch(searchItem) {
        // Clicca sull'icona della lente (per aprire la barra se è nascosta)
        await this.searchIcon.click();

        // Seleziona il campo input di ricerca
        const searchInput = this.searchInputField;

        // Inserisci il testo nel campo
        await searchInput.fill(searchItem);

        // Premi Enter per inviare la ricerca
        await searchInput.press('Enter');

        // In alternativa, clicca sull’icona di submit della form (se disponibile)
        // await page.locator('button[name="search-button"]').click();
    };

    async searchProduct() {
        const productFound = this.searchDesiredProduct;
        await this.scrollToProduct(productFound);
        await productFound.click();
        await this.sizeDesiredProduct.click();
    };

    async addFavProductToWishlist() {
        await this.wishlistButton.click();
    };

    async clickForWishlistPage() {
        this.addProdToWishlist.click();
    };

    async checkProductIntoWishlist() {
        const chosenProduct = this.productName;
        const textChosenProduct = await chosenProduct.textContent();
        console.log(textChosenProduct);
    }



};
module.exports = { SearchPage };