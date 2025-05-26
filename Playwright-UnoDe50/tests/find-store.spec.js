const {test, expect} = require("@playwright/test");
const { POManager } = require('../pageobjects/POManager');

test.beforeEach(async ({page}) => {

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();    
    await loginPage.goto();

});

test("find store", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Find Store"});

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();
    const findStorePage = pomManager.getFindStorePage();

    // Accept "Accept all cookies"
    await loginPage.acceptCookie();

    // Close pop up "new subscribers"
    await loginPage.declinePopUpNewSubscribers();

    await findStorePage.findDesiredStore();
    
    // Follow the road indicated on Google Maps to get to the store
})