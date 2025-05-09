const { test, expect } = require('@playwright/test');
const { request } = require('http');

test('Security test request intercept', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client");
    const username = await page.locator("#userEmail");
    const email = "luckystone@gmail.com";
    const password = await page.locator("#userPassword");
    const login = page.locator("[value='Login']");

    await username.fill(email);
    await password.fill("Luckystone90");
    await login.click();
    
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb0487244490f9597ef94"}) 
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    //await page.pause();

});

test('Block response from Server', async ({browser})=>
{
    const context = await browser.newContext(); //si istanzia per creare un nuovo contesto
    const page = await context.newPage(); //per creare una nuova pagina
    //page.route('**/*.css', route => route.abort()); //i file che hanno estensione .css saranno interrotti nelle response del browser
    //page.route('**/*.{jpg, png, jpeg}', route => route.abort()); //le immagini che hanno estensione jpg, png, jpeg non verranno caricate nelle response del browser
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request=> console.log("le chiamate della request sono:" , request.url()));
    page.on('response', response=> console.log("le chiamate della response e lo status sono:" ,response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser
    console.log(await page.title());
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //css, xpath
    await username.fill("rahulshetty"); //questo per trovare il locatore username e scrivere dentro la username
    await password.fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent()); //textContent serve per visualizzate il contenuto testuale di quell'attributo
    expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await username.fill(""); //si scrive in questo modo per cancellare ciò che era presente precedentemente nella box
    await username.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await cardTitles.first().textContent()); //restituisce il primo elemento trovato
    console.log(await cardTitles.nth(1).textContent()); ////restituisce il secondo elemento trovato all'interno di un array con indice 0
}); 