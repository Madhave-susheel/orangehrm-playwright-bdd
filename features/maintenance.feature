Feature: Maintenance Module

  Scenario: Verify Access Flow
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Maintenance" module
    And user enters password "admin123" to confirm administrator access
    Then user should see the maintenance page actions
