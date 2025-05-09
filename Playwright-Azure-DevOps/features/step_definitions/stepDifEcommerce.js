const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('A login to DifEcommerce application with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser
    console.log(await this.page.title());
    expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //css, xpath
    await this.page.locator('#username').fill(username); //questo per trovare il locatore username e scrivere dentro la username
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#signInBtn").click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent()); //textContent serve per visualizzate il contenuto testuale di quell'attributo
    expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
