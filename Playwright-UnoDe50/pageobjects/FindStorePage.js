const { expect } = require('@playwright/test');

class FindStorePage {

    constructor(page) {

        this.page = page;
        this.storeIcon = page.locator("i[class='icon-store']");
        this.zipCode = page.locator("#store-postal-code");
        this.searchStore = page.locator("button[class='btn btn-block btn-primary btn-storelocator-search']");
        this.nameStoreFound = page.locator("div[class='store-name']");
        this.howToGetButton = page.getByText('Cómo llegar');
        this.acceptAllButton = page.getByRole('button', { name: 'Accetta tutto' });
        this.startPointIndication = page.locator("input[aria-controls='sbsg50']");
        this.routeChosen = page.locator("#section-directions-trip-0");

    }

    async findDesiredStore() {

        await this.storeIcon.click();

        // we will use the zipcode of Milan for this test (zipcode = 20122)
        await this.zipCode.fill("20122");

        // Click "Trova negozi" button
        await this.searchStore.click();

        // Click name store found
        await this.nameStoreFound.click();

        // Click "Cómo llegar" ("how to get") button
        await this.howToGetButton.click();

        // After clicking "Cómo llegar" button, it opens Google Maps to enter the starting point to calculate the route
        // Click "Accetta tutto" button on Google
        await this.acceptAllButton.click();

        // Enter your current location in the starting point box of Google Maps
        const startPoint = this.startPointIndication;
        await startPoint.fill("piazza duomo milano");
        await startPoint.press('Enter');

        // Choose the route
        await this.routeChosen.click();

    }

}
module.exports = { FindStorePage };