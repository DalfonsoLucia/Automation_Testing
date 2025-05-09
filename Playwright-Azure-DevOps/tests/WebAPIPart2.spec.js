const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

let webContext;

test.beforeAll(async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const email = "luckystone@gmail.com";
    const username = await page.locator("#userEmail");
    const password = await page.locator("#userPassword");
    const login = page.locator("[value='Login']");

    await username.fill(email);
    await password.fill("Luckystone90");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

});


test('@API Web Client App Login, add product to Cart and make a Order_with API', async ()=>
    {

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i < count; ++i) {
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
    
    await page.locator("[placeholder*='Country']").pressSequentially("Ita",{delay:100});
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
    }

    
    page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    
    const idOrder = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(idOrder);
    
    //await page.pause();
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    const orderId = await page.locator(".ng-star-inserted .table-bordered ").textContent();
    console.log(orderId);

    for (let i = 0; i < await rows.count(); ++i) {
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

test('Test case 2', async ()=>
    {

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    });
