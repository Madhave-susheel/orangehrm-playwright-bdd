Feature: Time Module

  Scenario: View Employee Timesheets
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Time" module
    And user views timesheet for employee "Peter"
    Then timesheet for "Peter" should be displayed
