Feature: Admin Module

  Scenario: Add, Search, Edit and Delete User
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Admin" module
    And user clicks add user button
    And user fills new user details with role "ESS", employee name "Peter", status "Enabled", and username "testuser_bdd"
    And user enters password "Password123!" for the new user
    And user clicks save button
    Then user should see the user "testuser_bdd" in the system users list
    When user searches for user "testuser_bdd"
    And user clicks edit user "testuser_bdd"
    And user updates user status to "Disabled" and clicks save button
    Then user should see user "testuser_bdd" with status "Disabled" in search results
    When user clicks delete user "testuser_bdd"
    And user confirms delete action
    Then user "testuser_bdd" should not appear in system users list
