require 'rails_helper'

feature 'Accounts', type: :feature do
  before :each do
    # create a few date ranges
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
    FactoryGirl.create(:account_type, name: 'Savings')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates a new Account', js: true do
    start_my_money

    create_account({
      name: 'New Account Name',
      bank: 'New Account Bank',
      starting_date: '9-Sep-2000',
      starting_balance: '10.00'
    })
    expect(page).to have_content('my accounts')

    show_account('New Account Name')
    verify_account('New Account Name', 'New Account Bank', '9-Sep-2000', '$10.00')
  end

  scenario 'User edits an account', js: true do
    start_my_money
    create_account({name: 'Edit Account'})

    show_account('Edit Account')
    edit_account({
      name: 'New Edit Name',
      bank: 'New Edit Bank',
      starting_date: '1-Jan-2014',
      starting_balance: '30.00'
    })
    verify_account('New Edit Name', 'New Edit Bank', '1-Jan-2014', '$30.00')
  end

  xscenario 'User deletes an account', js: true do
    # given I have an account
    FactoryGirl.create(:account, name: 'My Delete Account')

    start_my_money

    # and I click on show
    click_on('show')

    # and I click on edit
    click_on('edit')

    # and I click on delete and click ok
    click_on('delete')
    confirm_alert

    # then I see the index page
    expect(page).to have_text('my accounts')
    expect(page).not_to have_text('My Delete Account')
  end
end
