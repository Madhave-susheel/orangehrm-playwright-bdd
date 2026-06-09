Feature: Dashboard

  Scenario: Verify dashboard widgets and quick launch cards
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    Then user should see the dashboard widget "Time at Work"
    And user should see the dashboard widget "My Actions"
    And user should see the quick launch card "Assign Leave"
    And user should see the quick launch card "Leave List"
    And user should see the quick launch card "Timesheets"
    And user should see the quick launch card "Apply Leave"
    And user should see the quick launch card "My Leave"
    And user should see the quick launch card "My Timesheet"
