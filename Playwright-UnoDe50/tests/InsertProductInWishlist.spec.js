const {test, expect} = require("@playwright/test")

test.beforeEach(async ({page}) => {

    page.goto("https://www.unode50.com/eu/it_IT/home");

});

test("Insert product into Wishlist", async ({page}) => {
    test.info().annotations.push({type: "requirements", description: "Insert product into Wishlist"})

    // Log in to your account
    // Accept "Accept all cookies"
    await page.locator("#onetrust-accept-btn-handler").click();

    // Close pop up "new subscribers"
    await page.locator("#close-popup").click();

    // Click Account icon
    //await page.getByLabel("Accedi al tuo account").click(); //Possiamo usare 'getByLabel("...") di Playwright o .locator("...")
    await page.locator("a.hidden-xs-down").click()

    /*const logInTab = page.locator('[aria-controls="login"]')
    const logInText = await logInTab.innerText()
    console.log(logInText)*/

    // Check that we are in the login page 
    expect(page.locator('[aria-controls="login"]')).toHaveText("Accedi");

    // Login Account
    await page.locator("#login-form-email").fill("selene_venus_in_the_sky@outlook.it");
    await page.locator("#login-form-password").fill("Venusinthesky89!");

    // Click checkbox "Remember Me"
    await page.locator(".custom-checkbox.remember-me").click();

    //Click "Accedi" button
    await page.locator("form[name='login-form'] button[type='submit']").click();

    const datiPersonali = page.locator('h2[class="pull-left profile-header"]');
    const text = await datiPersonali.textContent();
    console.log(text);

    // Verify the login made successfully
    expect(text).toContain("I miei dati personali");

    await page.locator('a[class="logo-home"]').click();

    // Choose a product and put it in your Wishlist
    await page.locator("(//a[@id='pulseras'])[1]").click();

    await page.getByTitle("Bracciale rigido con tre sfere placcate argento Sterling, Argent").click();

    await page.locator('li[data-attr-value="M"]').click();

    // Click button "Add to wishlist"
    await page.locator('button[aria-label="button.add_to_wishlis"]').click();

    // Come back to Homepage
    await page.locator('a[class="logo-home logo-banner"]').click();

    // Click on Wishlist icon
    await page.locator('a[class="user-wishlist"]').click();

    const wishlistPage = page.locator("h2[class='wishlist-owner']")
    const WishText = await wishlistPage.textContent();
    console.log(WishText);

    // Verify that we are on the wishlist page
    expect(WishText).toContain("La mia lista dei desideri");

    // Verify to present of product inserted just in wishlist
    const product = page.locator("div[class='card product-info uuid-91f3841f213c035f0fedeec8ab pid-PUL2546MTL0000M'] div[class='line-item-name']");
    const productText = await product.textContent();
    console.log(productText);

    expect(productText).toContain("Bracciale rigido con tre sfere placcate argento Sterling");

    await page.pause();
});

