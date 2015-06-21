require 'rails_helper'

feature 'Category Report', type: :feature do
  before :each do
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    FactoryGirl.create(:date_range_option, description: 'Last 90 Days', klass: 'Lib::Last90DaysDateRange')

    FactoryGirl.create(:category_type, name: 'Expense')
    @ct_i = FactoryGirl.create(:category_type, name: 'Income')
    c1 = FactoryGirl.create(:category, name: 'First Category', category_type: @ct_i)
    c2 = FactoryGirl.create(:category, name: 'Second Category', category_type: @ct_i)
    FactoryGirl.create(:subcategory, name: 'First Subcategory', category: c1)
    FactoryGirl.create(:subcategory, name: 'Second Subcategory', category: c2)

    FactoryGirl.create(:account_type, id: 1, name: 'Savings')
    FactoryGirl.create(:account_type, id: 2, name: 'Shares')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User views the category report', js: true  do
    start_my_money
    visit_accounts
    create_account 'Savings', name: 'My Account'
    visit_account_transactions 'My Account'

    create_transaction(
      date: format_date(Date.today),
      notes: 'First Transaction',
      category: 'First Category'
    )
    create_transaction(
      date: format_date(Date.today),
      notes: 'Second Transaction',
      category: 'Second Category'
    )

    visit_report 'Category Report'
    expect(page).to have_text('category report')
    select 'First Category', from: 'category_id'
    click_on 'Search'

    click_on 'Data'
    verify_transaction('First Transaction', ['First Category'])
    expect(page).not_to have_text('Second Transaction')

    edit_transaction('First Transaction', category: 'Second Category')
    expect(page).not_to have_text('First Transaction')

    select 'Second Category', from: 'category_id'
    click_on 'Search'

    click_on 'Data'
    verify_transaction('First Transaction', ['Second Category'])
    verify_transaction('Second Transaction', ['Second Category'])
  end
end
