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