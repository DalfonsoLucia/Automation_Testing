Feature: Ecommerce validations

  @Regression
  Scenario: Placing the Order
    Given A login to Ecommerce application with "luckystone@gmail.com" and "Luckystone90"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory
    Then Close Ecommerce
