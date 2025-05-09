import {test, expect} from '@playwright/test';

test('Illustration of Special locators in Playwright', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //await page.getByRole("name").fill("Lucky D.A. Stone");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Luckystone90");
    await page.getByRole("button", {name: 'Submit'}).click();
    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible());
    await page.getByLabel("close").click();
    await page.getByRole("link", {name: "Shop"}).click();
    

    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();

    //await page.pause();
    })

test('test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    //await page.getByRole("name").fill("Lucky D.A. Stone");

    await page.getByPlaceholder("enter your passsword").fill("Luckystark90");

    //await page.pause();
    })
