Feature: Directory Module

  Scenario: Search Employee in Company Directory
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Directory" module
    And user searches directory for employee "Peter"
    Then search results for directory should be displayed
