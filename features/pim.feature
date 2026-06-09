Feature: PIM Module

  Scenario: Add, Search, and Edit Employee Details
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "PIM" module
    And user clicks add employee button
    And user fills employee details "John", "Robert", "Doe" with ID "998877"
    And user clicks save button
    Then employee details page should be displayed
    When user navigates to "PIM" module
    And user searches for employee with ID "998877"
    Then user should see employee "John Robert Doe" in search results
    When user clicks edit employee with ID "998877"
    And user updates employee other ID to "554433" and license number to "DL12345678"
    Then employee other ID should be saved as "554433"
