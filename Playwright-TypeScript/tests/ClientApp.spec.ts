import { test, expect } from "@playwright/test";

test("Web Client App Login, add product to Cart and make a Order", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const username = await page.locator("#userEmail");
  const email = "luckystone@gmail.com";
  const password = await page.locator("#userPassword");
  const login = page.locator("[value='Login']");
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const addCart = page.locator("[style*='float: right']").first();
  const cart = page.locator(".cart");
  const checkout = page.locator("button:has-text('Checkout')");

  //await username.fill("anshika@gmail.com");
  await username.fill(email);
  //await password.fill("Iamking@000");
  await password.fill("Luckystone90");
  await login.click();

  await page.waitForLoadState("networkidle");
  //await page.locator(".card-body b").first().waitFor(); //alternativa all'uso di page.waitForLoadState('networkidle');
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      // await addCart.click(); //Alternativa, anche se meno performante, del comando inserita alla riga 24
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const visibleProduct = await page
    .locator("h3:has-text('ZARA COAT 3')")
    .isVisible();
  //expect(await cart.textContent(productName)); alternativa all'asserzione alla riga 31
  expect(visibleProduct).toBeTruthy();
  await page.locator("text=Checkout").click();
  //await checkout.click(); //alternativa alla riga 37
  const creditCard = page.locator("[type='text']").nth(0);
  await creditCard.fill("1245 7845 5689 5687");
  const mounth: any = page.locator(".ddl").nth(0);
  await mounth.selectOption("02");
  expect(mounth.textContent("02"));
  const day: any = page.locator(".ddl").nth(1);
  await day.selectOption("20");
  expect(day.textContent("20"));
  const cvvCode = page.locator("[type='text']").nth(1);
  await cvvCode.fill("345");
  const nameCard = page.locator("[type='text']").nth(2);
  await nameCard.fill("Lucy D.A. Stone");
  //come è stato eseguito nel corso
  /*await page.locator("[placeholder*='Country']").pressSequentially("Ita",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i =0; i< optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " France Metropolitan"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }*/
  //fine

  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  //come è stato eseguito nel corso
  //page.locator(".action__submit").click();
  //expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  //fine

  await page.locator("[placeholder*='Country']").pressSequentially("Ita");
  const selectCountry = page.locator("button:has-text('Italy')");
  await selectCountry.click();
  const placeholderButton = page.locator("text = Place Order");
  await placeholderButton.click();
  const orderClosed: any = page.locator(
    "h1:has-text(' Thankyou for the order. ')"
  );
  expect(orderClosed.textContent("Thankyou"));

  const idOrder = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(idOrder);

  //await page.pause();
});

test("Search ID Order in My Orders Tab", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const username = await page.locator("#userEmail");
  const email = "luckystone@gmail.com";
  const password = await page.locator("#userPassword");
  const login = page.locator("[value='Login']");

  await username.fill(email);
  //await password.fill("Iamking@000");
  await password.fill("Luckystone90");
  await login.click();

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  const orderId: any = await page
    .locator(".ng-star-inserted .table-bordered ")
    .textContent();
  console.log(orderId);

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  //await page.pause();
});
