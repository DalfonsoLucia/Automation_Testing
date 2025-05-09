const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad = { userEmail: "luckystone@gmail.com", userPassword: "Luckystone90" };
const orderPayload = { orders: [{ country: "Italy", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayLoad = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const aPIUtils = new APIUtils(apiContext, loginPayLoad);
    //response = aPIUtils.createOrder(orderPayload);

});

test('Place the order', async ({ page }) => {
    const apiContext = await request.newContext();
    const aPIUtils = new APIUtils(apiContext, loginPayLoad);
    response = await aPIUtils.createOrder(orderPayload);

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "";
    await page.goto("https://rahulshettyacademy.com/client");

    const emailLogin = "luckystone@gmail.com";

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const visibleProduct = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(visibleProduct).toBeTruthy();
    await page.locator("text=Checkout").click();
    const creditCard = page.locator("[type='text']").nth(0);
    await creditCard.fill("1245 7845 5689 5687");
    const mounth = page.locator(".ddl").nth(0);
    await mounth.selectOption("02");
    expect(mounth.textContent("02"));
    const day = page.locator(".ddl").nth(1);
    await day.selectOption("20");
    expect(day.textContent("20"));
    const cvvCode = page.locator("[type='text']").nth(1);
    await cvvCode.fill("345");
    const nameCard = page.locator("[type='text']").nth(2);
    await nameCard.fill("Lucy D.A. Stone");
    await page.locator("[placeholder*='Country']").pressSequentially("Ita", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " France Metropolitan") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(emailLogin);

    page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");

});

test('Place the order with API', async ({ page }) => {
    const apiContext = await request.newContext();
    const aPIUtils = new APIUtils(apiContext, loginPayLoad);

    response = await aPIUtils.createOrder(orderPayload);

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoad);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        });

    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());

});