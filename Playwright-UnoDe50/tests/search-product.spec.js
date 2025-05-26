const {test, expect} = require("@playwright/test");
const { POManager } = require('../pageobjects/POManager')

test.beforeEach(async ({page}) => {

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();    
    await loginPage.goto();

});

test.only("search product", async ({page}) =>{
    test.info().annotations.push({type: "requirements", description: "search product"});

    const pomManager = new POManager(page);
    const loginPage = pomManager.getLoginPage();
    const searchPage = pomManager.getSearchPage();
    const wishlistPage = pomManager.getWishlistPage();
    
    await loginPage.acceptCookie();
    await loginPage.declinePopUpNewSubscribers();

    // insert product to find
    // Clicca sull'icona della lente (per aprire la barra se è nascosta)
    await searchPage.insertItemToSearch("anello pallini");

    // choose "Anello sfere placcato argento Sterling, Argent"
    await searchPage.searchProduct();
    
    // Add favorite product to wishlist
    await searchPage.addFavProductToWishlist();

    // Verify if product just inserted is present in wishlist
    searchPage.checkProductIntoWishlist();

    await wishlistPage.backToHomepage();
    await searchPage.clickForWishlistPage();

    const productWishlist = page.locator("div[class*='pid-ANI0572MTL0000L']");
    const textProductWishlist = await productWishlist.textContent();
    console.log(textProductWishlist);

    expect(textProductWishlist).toContain("Anello sfere placcato argento Sterling");
    // expect(page.locator("div[class*='pid-ANI0572MTL0000L']")).toContainText("Anello sfere placcato argento Sterling");
    expect(textProductWishlist).toContain('€ 89,00');
    await page.pause();




})