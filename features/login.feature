Feature: Authentication

  Scenario: Successful Login
    Given user navigates to OrangeHRM login page
    When user enters valid username
    And user enters valid password
    And user clicks login button
    Then user should be redirected to dashboard

  Scenario: Logout
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user clicks logout button
    Then user should be redirected to login page

  Scenario: Invalid Login
    Given user navigates to OrangeHRM login page
    When user enters invalid username
    And user enters invalid password
    And user clicks login button
    Then user should see invalid credentials message

  Scenario: Empty Username
    Given user navigates to OrangeHRM login page
    When user enters empty username
    And user enters valid password
    And user clicks login button
    Then user should see required validation message under username

  Scenario: Empty Password
    Given user navigates to OrangeHRM login page
    When user enters valid username
    And user enters empty password
    And user clicks login button
    Then user should see required validation message under password
