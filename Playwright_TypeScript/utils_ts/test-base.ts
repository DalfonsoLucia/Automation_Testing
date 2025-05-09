import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
  email: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: {
    email: "luckystone@gmail.com",
    password: "Luckystone90",
    productName: "ZARA COAT 3",
  },
});
