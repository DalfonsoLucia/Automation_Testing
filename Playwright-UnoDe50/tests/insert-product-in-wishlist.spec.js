const {test, expect} = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");

test.beforeEach(async ({page}) => {

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();    
    await loginPage.goto();

});

test("Insert product into Wishlist", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Insert product into Wishlist"});

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();
    const wishlistPage = pomManager.getWishlistPage();
    

    // Log in to your account
    // Accept "Accept all cookies"
    await loginPage.acceptCookie();

    // Close pop up "new subscribers"
    await loginPage.declinePopUpNewSubscribers();

    // Click Account icon
    //await page.getByLabel("Accedi al tuo account").click(); //Possiamo usare 'getByLabel("...") di Playwright o .locator("...")
    await loginPage.clickAccountIcon();

    /*const logInTab = page.locator('[aria-controls="login"]')
    const logInText = await logInTab.innerText()
    console.log(logInText)*/

    // Check that we are in the login page 
    expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    // Login Account
    await loginPage.loginAccount();

    const datiPersonali = page.locator('h2[class="pull-left profile-header"]');
    const text = await datiPersonali.textContent();
    console.log(text);

    // Verify the login made successfully
    expect(text).toContain("I miei dati personali");

    await loginPage.goBackHomapage();

    // Choose a product and put it in your Wishlist
    await wishlistPage.chooseFavoriteProduct();

    // Click button "Add to wishlist"
    await wishlistPage.addProductToWishlist();

    // Come back to Homepage
    await wishlistPage.backToHomepage();
    
    // Click on Wishlist icon
    await wishlistPage.clickForWishlistPage();

    const wishlist = page.locator("h2[class='wishlist-owner']");
    const WishText = await wishlist.textContent();
    console.log(WishText);

    // Verify that we are on the wishlist page
    expect(WishText).toContain("La mia lista dei desideri");

    // Verify to present of product inserted just in wishlist
    const product = page.locator("div[class*='pid-PUL2546MTL0000M'] div[class='line-item-name']");

    const productText = await product.textContent();
    console.log(productText);

    expect(productText).toContain("Bracciale rigido con tre sfere placcate argento Sterling");
});

