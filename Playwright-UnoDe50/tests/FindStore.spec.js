const {test, expect} = require("@playwright/test");
const { start } = require("repl");

test.beforeEach(async ({page}) => {

    page.goto("https://www.unode50.com/eu/it_IT/home");

});

test.only("find store", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Find Store"})

    // Accept "Accept all cookies"
    await page.locator("#onetrust-accept-btn-handler").click();

    // Close pop up "new subscribers"
    await page.locator("#close-popup").click();

    await page.locator("i[class='icon-store']").click();

    // we will use the zipcode of Milan for this test (zipcode = 20122)
    await page.locator("#store-postal-code").fill("20122");

    // Click "Trova negozi" button
    await page.locator("button[class='btn btn-block btn-primary btn-storelocator-search']").click();

    // Click name store found
    await page.locator("div[class='store-name']").click();

    // Click "Cómo llegar" ("how to get") button
    await page.getByText('Cómo llegar').click();

    // After clicking "Cómo llegar" button, it opens Google Maps to enter the starting point to calculate the route
    // Click "Accetta tutto" button on Google
    await page.getByRole('button', { name: 'Accetta tutto' }).click();

    // Click "starting point" box of Google Maps
    const startPoint = page.locator("input[aria-controls='sbsg50']");
    await startPoint.fill("piazza duomo milano");
    await startPoint.press('Enter');

    // Choose the route
    await page.locator("#section-directions-trip-0").click();

    // Follow the road indicated on Google Maps to get to the store
})