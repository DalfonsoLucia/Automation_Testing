import { test, expect, Locator } from "@playwright/test";

test("Login with username incorrect_Personal", async ({ browser }) => {
  const context = await browser.newContext(); //si istanzia per creare un nuovo contesto
  const page = await context.newPage(); //per creare una nuova pagina
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //css, xpath
  const name = "rahulshetty";
  await page.locator("#username").fill(name); //questo per trovare il locatore username e scrivere dentro la username
  await page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();
  //await expect(name).toBe("rahulshettyacademy"); //il name inserito non è corretto e quindi il test fallisce
  const form = await page.locator("#login-form");
  expect(form).toContainText("Incorrect");
});

test("Login with username incorrect", async ({ browser }) => {
  const context = await browser.newContext(); //si istanzia per creare un nuovo contesto
  const page = await context.newPage(); //per creare una nuova pagina
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //css, xpath
  await page.locator("#username").fill("rahulshetty"); //questo per trovare il locatore username e scrivere dentro la username
  await page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent()); //textContent serve per visualizzate il contenuto testuale di quell'attributo
  expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("@Web Login with right credentials and first element found", async ({
  browser,
}) => {
  const context = await browser.newContext(); //si istanzia per creare un nuovo contesto
  const page = await context.newPage(); //per creare una nuova pagina
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser
  console.log(await page.title());
  expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //css, xpath
  await username.fill("rahulshetty"); //questo per trovare il locatore username e scrivere dentro la username
  await password.fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent()); //textContent serve per visualizzate il contenuto testuale di quell'attributo
  expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await username.fill(""); //si scrive in questo modo per cancellare ciò che era presente precedentemente nella box
  await username.fill("rahulshettyacademy");
  await signIn.click();

  console.log(await cardTitles.first().textContent()); //restituisce il primo elemento trovato
  console.log(await cardTitles.nth(1).textContent()); ////restituisce il secondo elemento trovato all'interno di un array con indice 0
});

test("Login with right credentials and keep all elements found after first element", async ({
  browser,
}) => {
  const context = await browser.newContext(); //si istanzia per creare un nuovo contesto
  const page = await context.newPage(); //per creare una nuova pagina
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser
  console.log(await page.title());
  expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //css, xpath
  await username.fill("rahulshetty"); //questo per trovare il locatore username e scrivere dentro la username
  await password.fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent()); //textContent serve per visualizzate il contenuto testuale di quell'attributo
  expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await username.fill(""); //si scrive in questo modo per cancellare ciò che era presente precedentemente nella box
  await username.fill("rahulshettyacademy");
  await signIn.click();

  console.log(await cardTitles.first().textContent()); //restituisce il primo elemento trovato
  //console.log(await cardTitles.nth(1).textContent()); ////restituisce il secondo elemento trovato all'interno di un array con indice 0
  const allTitles = await cardTitles.allTextContents();
  console.log(await allTitles);
  expect(allTitles).toContain("iphone X");
});

test("Login with right credentials and select item in a static dropdown and select radiobutton and checkbox", async ({
  page,
}) => {
  const dropdown = page.locator("select.form-control");
  const radioButton = page.locator(".radiotextsty");
  const checkbox = page.locator("#terms");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser

  await radioButton.last().click();
  await page.locator("#okayBtn").click();

  console.log(await radioButton.last().isChecked());
  await expect(radioButton.last()).toBeChecked();
  //expect(radioButton.nth(1)).toBeChecked(); asserzione alternativa all'utilizzo del metodo last()
  await dropdown.selectOption("consult");
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  expect(await checkbox.isChecked()).toBeFalsy();

  //await page.pause();
});

test("Using async await with Assertions and understand validating the attributes", async ({
  page,
}) => {
  const username = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const radioButton = page.locator(".radiotextsty");
  const checkbox = page.locator("#terms");
  const documentLink = page.locator("[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser

  //await username.fill("rahulshettyacademy");
  //await password.fill("learning");
  await radioButton.last().click();
  await page.locator("#okayBtn").click();

  console.log(await radioButton.last().isChecked());
  await expect(radioButton.last()).toBeChecked();
  //expect(radioButton.nth(1)).toBeChecked(); asserzione alternativa all'utilizzo del metodo last()
  await dropdown.selectOption("consult");
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  expect(await checkbox.isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  //await signIn.click();
  //await page.pause();
});

test("Handling Child windows & Tabs with Playwright by switching browser context", async ({
  browser,
}) => {
  const context = await browser.newContext(); //si istanzia per creare un nuovo contesto
  const page = await context.newPage();
  const documentLink = page.locator("[href*='documents-request']");
  const username = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //per andare a una pagina specifica nel browser

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //ascolta l'apertura delle nuove pagine in background in pending, rigettata o completata
    documentLink.click(), //cliccando viene aperta una nuova pagina
  ]);

  let text:any
  text = await newPage.locator(".red").textContent();
  console.log(text);

  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await username.fill(domain);

  //await page.pause();
});

test("Codegen tool to record & Playback with generated automation script", async ({
  page,
}) => {
  await page.goto("https://www.google.com/");
  await page.getByLabel("Seleziona la lingua, it").click();
  await page.getByRole("button", { name: "Accetta tutto" }).click();
  await page.getByLabel("Cerca", { exact: true }).click();
  await page.getByLabel("Cerca", { exact: true }).fill("playwright");
  await page.goto("https://playwright.dev/");
});

test("First Playwright Test", async ({ page }) => {
  await page.waitForLoadState("networkidle");
  await page.goto("https://google.com"); //per andare a una pagina specifica nel browser
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
