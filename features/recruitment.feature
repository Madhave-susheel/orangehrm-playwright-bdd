Feature: Recruitment Module

  Scenario: Add and Search Candidate
    Given user navigates to OrangeHRM login page
    And user logs in with valid credentials
    When user navigates to "Recruitment" module
    And user clicks add candidate button
    And user fills candidate details "Alice", "Marie", "Smith" with email "alice.smith@example.com", contact "1234567890", vacancy "Associate QA Engineer"
    And user uploads candidate resume
    And user clicks save candidate button
    Then candidate details page should load successfully
    When user navigates to "Recruitment" module
    And user searches candidate "Alice Marie Smith"
    Then user should see candidate "Alice Marie Smith" in search results
