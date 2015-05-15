require 'rails_helper'

feature 'Accounts', type: :feature do
  before :all do
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
        starting_date: '09-Sep-2000',
        starting_balance: '10.00'
    })

    verify_account('New Account Name', 'New Account Bank', '10.00')
  end

  scenario 'User edits an account', js: true do
    start_my_money
    visit_accounts
    create_account({name: 'Edit Account'})


    # and I click on the show button for the account
    click_on('show')

    # then I should see the show page
    expect(page).to have_text('account summary')

    # when I click on the edit button
    click_on('edit')

    # then I should see the edit form for this page
    expect(page).to have_text('Edit Account')

    # when I edit the account
    fill_in('name', with: 'New Account Name')
    # and I click 'save'
    click_on('save')

    # then I should see the new account details on the account summary page
    expect(page).to have_text('account summary')
    expect(page).to have_text('New Account Name')
  end

  scenario 'User deletes an account', js: true do
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
