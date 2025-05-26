const { expect } = require('@playwright/test');

class LogoutPage {

    constructor(page) {
        this.page = page;
        this.nameAccountIcon = page.locator("div[id='myaccount']");
        this.logoutOption = page.locator("a[role='menuitem'][href*='Login-Logout']");

        //inserire tutti i locator
    }

    async logIntoAccountpage() {
        await this.nameAccountIcon.click();
    }

    async clickLogoutOption() {
        await this.logoutOption.click();
    }

}
module.exports = { LogoutPage };