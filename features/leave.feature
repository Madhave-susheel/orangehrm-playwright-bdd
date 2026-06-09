Feature: Leave Module

  Scenario: Assign and Search Leave
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Leave" module
    And user navigates to Assign Leave tab
    And user assigns "US - Personal" leave to employee "Amelia" from "2026-06-15" to "2026-06-16" with comment "Family emergency"
    Then leave request should be successfully submitted
    When user navigates to Leave List tab
    And user searches leave records from "2026-06-15" to "2026-06-16" for employee "Amelia"
    Then search results should contain the leave records
