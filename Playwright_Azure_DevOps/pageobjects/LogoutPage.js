const { expect } = require('@playwright/test');

class LogoutPage {
constructor(page) {

    this.page = page;
    //this.signOut = page.locator(".fa-sign-out");
    this.signOut = page.locator("text=  Sign Out ")

}

async signOut() {
    await this.signOut.waitFor({ state : 'visible'});
    await this.signOut.click();
}

}

module.exports = { LogoutPage };