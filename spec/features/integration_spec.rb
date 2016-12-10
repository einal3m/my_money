require 'rails_helper'

feature 'Integration test', type: :feature do
  before :each do
    FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
  end

  after :all do
    DatabaseCleaner.clean
  end

  scenario 'accounts, categories, transactions, patterns and reports', js: true do
    account_spec
    category_spec
    transaction_spec
    pattern_spec

    category_report_spec
    subcategory_report_spec
  end
end
