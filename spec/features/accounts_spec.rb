require 'rails_helper'

feature 'Accounts', type: :feature do
  before :each do
    FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates a new Savings account', js: true do
    start_my_money

    create_account('Savings', {
      name: 'New Account Name',
      bank: 'New Account Bank',
      starting_date: '9-Sep-2000',
      starting_balance: '10.00'
    })
    expect(page).to have_content('my accounts')

    show_account('New Account Name')
    verify_account(['New Account Name', 'New Account Bank', '9-Sep-2000', '$10.00'])
  end

  scenario 'User creates a new Share account', js: true do
    start_my_money

    create_account('Share', {
      name: 'New Account Name',
      ticker: 'TCK'
    })
    expect(page).to have_content('my accounts')
    verify_account(['New Account Name', 'TCK', '$ --'])

    show_account('New Account Name')
    verify_account(['New Account Name', 'TCK'])
  end

  scenario 'User edits an account', js: true do
    start_my_money
    create_account('Savings', {name: 'Edit Account'})

    show_account('Edit Account')
    edit_account('Savings', {
      name: 'New Edit Name',
      bank: 'New Edit Bank',
      starting_date: '1-Jan-2014',
      starting_balance: '30.00'
    })
    verify_account(['New Edit Name', 'New Edit Bank', '1-Jan-2014', '$30.00'])
  end
end
