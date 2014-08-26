Feature: Manage Accounts
  In order to use my_money
  As a user
  I want to create and manage accounts
  
  Scenario: Account Summary
    Given I have accounts titled Account1, Account2
    When I go to the accounts page
    Then I should see "Account1"
    And I should see "Account2"

  
  Scenario: Create Valid Account
    Given I have no accounts
    And I am on the accounts page
    When I click the new account button
    And I fill in "Name" with "Account1"
    And I fill in "Bank" with "My Bank"
    And I fill in "Starting balance" with "0.00"
    And I click the "Save" button
    Then I should see "Account was successfully created."
    And I should see "Account1"
    And I should see "0.00"
    And I should see "My Bank"
    And I should have 1 account

