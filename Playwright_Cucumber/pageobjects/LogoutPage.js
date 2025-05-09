const { expect } = require('@playwright/test');

class LogoutPage {
constructor(page) {

    this.page = page;
    //this.signOut = page.locator(".fa-sign-out");
    //this.signOut = page.locator('text=  Sign Out ');

}

async signOut() {
    await this.page.locator('text=  Sign Out ').waitFor({ state : 'visible'});
    await this.page.locator('text=  Sign Out ').click();
}

}

module.exports = { LogoutPage };