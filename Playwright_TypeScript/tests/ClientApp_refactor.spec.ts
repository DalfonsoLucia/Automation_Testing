import { test, expect } from "@playwright/test";

test("Web Client App Login, add product to Cart and make a Order", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const username = await page.getByPlaceholder("email@example.com");
  const email = "luckystone@gmail.com";
  const password = await page.getByPlaceholder("enter your passsword");
  const login = page.getByRole("button", { name: "Login" });
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";


  await username.fill(email);
  await password.fill("Luckystone90");
  await login.click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  //sostituisce il ciclo for che era presente nella prima versione di questo test presente nel file ClientApp.spec.js e il click sul bottone 'Add To Cart"
  await products
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: " Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await page.locator("div li").first().waitFor();
  expect(page.getByText(productName)).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();

  await page.locator("[type='text']").nth(0).fill("1245 7845 5689 5687");
  //prova a usare getByRole con check box e fill
  expect(await page.locator(".ddl").nth(0).selectOption("02"));
  expect(await page.locator(".ddl").nth(1).selectOption("20"));
  await page.locator("[type='text']").nth(1).fill("345");
  await page.locator("[type='text']").nth(2).fill("Lucy D.A. Stone");

  await page.getByPlaceholder("Select Country").pressSequentially("Ita");

  await page.getByRole("button", { name: "Italy" }).click();

  await page.getByText("PLACE ORDER").click();
  expect(page.getByText("Thankyou for the order.")).toBeVisible();

  const idOrder = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(idOrder);

  //await page.pause();
});

test("Search ID Order in My Orders Tab", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const username = await page.getByPlaceholder("email@example.com");
  const email = "luckystone@gmail.com";
  const password = await page.getByPlaceholder("enter your passsword");
  const login = page.getByRole("button", { name: "Login" });

  await username.fill(email);
  await password.fill("Luckystone90");
  await login.click();

  await page.getByRole("button", { name: "ORDERS" }).click();
  await page.locator("tbody").waitFor();
  const rows: any = await page.locator("tbody tr");

  const orderId: any = await page
    .locator(".ng-star-inserted .table-bordered ")
    .textContent();
  console.log(orderId);

  await rows
    .filter(page.getByRole("row"))
    .first()
    .getByRole("button", { name: "View" })
    .click();

  const orderIdDetails: any = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  //await page.pause();
});
