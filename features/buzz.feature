Feature: Buzz Module

  Scenario: Create Post and Verify Post Appears
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user sets up Buzz mock page to bypass access restriction
    And user navigates to "Buzz" module
    And user creates a buzz post with content "Playwright-BDD framework is working beautifully!"
    Then user should see the new buzz post with content "Playwright-BDD framework is working beautifully!"
