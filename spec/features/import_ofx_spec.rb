require 'rails_helper'

feature 'Accounts', type: :feature do
  before :each do
    # create a few date ranges
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    cte = FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
    c = FactoryGirl.create(:category, name: 'Category1', category_type: cte)
    FactoryGirl.create(:subcategory, name: 'Subcategory1', category: c)
    FactoryGirl.create(:account_type, name: 'Savings')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'Import OFX', js: true do
    start_my_money
    create_account('Savings', { name: 'Import Account' })
    visit_account_transactions 'Import Account'
    import_test_ofx
  end
end
