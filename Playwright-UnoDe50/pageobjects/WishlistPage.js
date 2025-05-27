const { expect } = require('@playwright/test');

class WishlistPage {

    constructor(page) {
        this.page = page;
        this.category = page.locator("(//a[@id='pulseras'])[1]");
        this.favProduct = page.getByTitle("Bracciale rigido con tre sfere placcate argento Sterling, Argent");
        this.sizeFavProduct = page.locator('li[data-attr-value="M"]');
        this.addWishlistButton = page.locator('button[aria-label="button.add_to_wishlis"]');
        this.backtoHomapageLogo = page.locator('a[class="logo-home logo-banner"]');
        this.wishlistIcon = page.locator('a[class="user-wishlist"]');
    }

    async clearWishlist() {
        const wishlistItems = this.page.locator('div.card.product-info');
        const count = await wishlistItems.count();

        if (count === 0) {
            console.log('Wishlist già vuota.');
            return;
        }

        console.log(`Wishlist contiene ${count} elementi, ora li rimuovo...`);

        while (await wishlistItems.count() > 0) {
        const item = wishlistItems.first();
        await item.locator('button.remove-from-wishlist').click();
        await this.page.waitForTimeout(500); // piccola attesa dopo ogni rimozione
        }

        await expect(this.page.locator('div.card.product-info')).toHaveCount(0);

        console.log('Wishlist pulita con successo.');

        console.log('Wishlist pulita.');
    }


    async chooseFavoriteProduct() {
        await this.category.click();

        await this.favProduct.click();

        await this.sizeFavProduct.click();
    }

    async addProductToWishlist() {
        await this.addWishlistButton.click();
    }

    async backToHomepage() {
        await this.backtoHomapageLogo.click();
    }

    async clickForWishlistPage() {
        await this.wishlistIcon.click();
    }

};
module.exports = { WishlistPage }