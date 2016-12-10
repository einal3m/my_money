require 'rails_helper'

feature 'Transactions', type: :feature do
  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates, edits, deletes and filters transactions for a savings account', js: true  do
    visit_categories
    create_categories

    visit_accounts
    create_savings_account

    transaction_spec
  end
end
