Feature: Performance Module

  Scenario: Search Employee Performance Reviews
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Performance" module
    And user searches reviews for employee "Peter"
    Then search results for reviews should be displayed
