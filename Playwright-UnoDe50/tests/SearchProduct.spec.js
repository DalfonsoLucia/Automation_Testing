const {test, expect} = require("@playwright/test");

test.beforeEach(async ({page}) => {

    await page.goto("https://www.unode50.com/eu/it_IT/home");

});

test("search product", async ({page}) =>{
    test.info().annotations.push({type: "requirements", description: "search product"})

    // Accept "Accept all cookies"
    await page.locator("#onetrust-accept-btn-handler").click();

    // Close pop up "new subscribers"
    await page.locator("#close-popup").click();

    // Click search icon
    await page.locator(".site-search").click();

    // insert product to find
    const productSearch = page.locator('input[class="form-control search-field"]');
    productSearch.fill("anello pallini");

    // choose "Anello placcato Argento Sterling con tre cristalli verdi"
    const productFound = page.locator('img[src*="ANI0843MTL000_1.jpg"]');
    await productFound.click();
    
    // Add favorite product to wishlist
    await page.locator('li[data-attr-value="15"]').click();
    await page.locator('button[data-href*="Wishlist-AddProduct"]').click();

    // Verify if product just inserted is present in wishlist
    const chosenProduct = page.locator('h1[class="product-name"]')
    const textChosenProduct = await chosenProduct.textContent();
    console.log(textChosenProduct);

    await page.locator('a[class="logo-home logo-banner"]').click();
    await page.locator('span[title="Wishlist"]').click();

    const productWishlist = page.locator("div[class*='pid-ANI0843MTL00015']");
    const textProductWishlist = await productWishlist.textContent();
    console.log(textProductWishlist);

    expect(textProductWishlist).toContain("Anello placcato argento Sterling con tre sfere di varie dimensioni");
    // expect(page.locator("div[class*='pid-ANI0843MTL00015']")).toContainText("Anello placcato argento Sterling con tre sfere di varie dimensioni");
    expect(textProductWishlist).toContain('€ 99,00');
    await page.pause();




})