import {test, expect} from '@playwright/test';

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});

test('@Web Popup Validations', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        //await page.goto("https://google.com");
        //await page.goBack(); //si usa page.goBack per tornare indietro nelle pagine web
        //await page.goForward();
        //await page.pause();

        //await expect(page.locator("#displayed-text").textContent(["style*='display: block;']"])).toBeTruthy();
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        //await page.pause();
    });

test('Popup Google Validations', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        page.on('dialog', dialog => dialog.accept());
        await page.locator("#confirmbtn").click();
        //se volessi declinare
        //page.on('dialog', dialog => dialog.dismiss());
        
        await page.locator("#mousehover").hover();
        await page.getByText("Top").click();
        //se volessi cliccare su Reload si eseguirà
        //await page.getByText("Reload").click();

        //await page.pause();
    });

test('Automate Frames', async ({page})=>
    {
        let textCheck:any;

        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.pause();

        const framesPage = page.frameLocator("#courses-iframe");
        await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //ci sono 2 elementi con lo stesso locatore li a[href*='lifetime-access'] uno è invisibile, mettiamo: visible per fare match con quello visibile.
        textCheck = await framesPage.locator(".text h2").textContent();
        console.log(textCheck.split(" ")[1]);

        //await page.pause();
    });