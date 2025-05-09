Feature: Error validations

  @Parameters
  Scenario Outline: Placing the Order
    Given A login to DifEcommerce application with "<username>" and "<password>"
    Then Verify Error message is displayed

  Examples:
  | username               | password          |
  | luckystone@gmail.com   | Luckystone90      |
  | rahulshetty            | learning          |
  


