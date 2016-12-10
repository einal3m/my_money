require 'rails_helper'

feature 'Subcategory Report', type: :feature do
  before :each do
    FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User views the category report', js: true do
    visit_accounts
    create_savings_account

    visit_categories
    create_categories

    visit_account_transactions 'Account One'
    create_transactions

    subcategory_report_spec
  end
end
