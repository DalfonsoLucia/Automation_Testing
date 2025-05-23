const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.cookie = page.locator("#onetrust-accept-btn-handler");
        this.closePopUpNewSubscribers = page.locator("#close-popup");
        this.accountIcon = page.locator("a.hidden-xs-down");
        this.email = page.locator("#login-form-email");
        this.password = page.locator("#login-form-password");
        this.rememberCheckbox = page.locator(".custom-checkbox.remember-me");
        this.accessButton = page.locator("form[name='login-form'] button[type='submit']");
        this.logo = page.locator('a[class="logo-home"]');
    }

    async goto() {
        await this.page.goto("https://www.unode50.com/eu/it_IT/home");
    }

    async acceptCookie() {
        await this.cookie.click();
    }

    async declinePopUpNewSubscribers() {
        await this.closePopUpNewSubscribers.click();
    }

    async clickAccountIcon() {
        await this.accountIcon.click()
    }

    async loginAccount() {
        await this.email.fill("selene_venus_in_the_sky@outlook.it");
        await this.password.fill("Venusinthesky89!");
        // Click checkbox "Remember Me"
        await this.rememberCheckbox.click();
        //Click "Accedi" button
        await this.accessButton.click();
    }

    async goBackHomapage() {
        await this.logo.click();
    }

}
module.exports = { LoginPage };



