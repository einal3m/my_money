Feature: My app has a home page
  In order to use my app
  The users
  Should be able to view the home page

  Scenario: The application has a home page
    Given I am on the home page
    Then I should see a "navbar"
    And I should see a "title"
    And I should see a "footer"
    And I should see a link called "accounts"
