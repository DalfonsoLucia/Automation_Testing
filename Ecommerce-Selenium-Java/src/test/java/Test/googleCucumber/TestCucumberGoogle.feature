Feature: Test Google Search
  As a user
  I want to search for "samsung s23" on Google
  So that I can do purchase phone on an online store

  Scenario: Search for "samsung s23" on Google and Purchase
    Given I am on the Google homepage and refuse cookie
    When I search for "samsung s23" and click
    Then I select the search result with URL "https://www.samsung.com"
    And I refuse the cookie on Samsung website
    When I click on the Galaxy S23+ model in the devices section
    Then the device model shown should be the Galaxy S23+
    And the displayed device memory should be 512GB | 8GB
    When the user selects the purchase option and be selected via the 'is-checked' word
    And the purchase option should have a background color of "rgba(33, 137, 255, 1)"
    And the total price in the cart should be "1.349,00 €"
    And the selected phone model should be "Galaxy S23+"
#   THEN Dopo tutto sto casino, puoi premere finalmente il pulsante acquista!

