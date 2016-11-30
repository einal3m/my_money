require 'rails_helper'

feature 'Accounts', type: :feature do
  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates a Savings account, edits and deletes it', js: true do
    visit_accounts

    create_account('Savings', {
      name: 'New Account Name',
      bank: 'New Account Bank',
      starting_date: '9-Sep-2000',
      starting_balance: '10.00'
    })

    verify_account('Savings', 'New Account Name', ['New Account Bank', '$10.00'])

    edit_account('New Account Name', {
      name: 'Edited Account Name',
      bank: 'Edited Account Bank',
      starting_balance: '2.00'
    })

    verify_account('Savings', 'Edited Account Name', ['Edited Account Bank', '$2.00'])

    delete_account('Edited Account Name')
    verify_account_deleted('Edited Account Name')
  end

  scenario 'User creates a new Share account', js: true do
    visit_accounts

    create_account('Share', {
      name: 'New Account Name',
      ticker: 'TCK'
    })

    verify_account('Share', 'New Account Name', ['$0.00'])
  end

  scenario 'User creates a new Loan account', js: true do
    visit_accounts

    create_account('Loan', {
      name: 'New Account Name',
      bank: 'New Account Bank',
      limit: '10000.00',
      term: '20',
      interest_rate: '3.59',
      starting_date: '9-Sep-2000',
    })

    verify_account('Loan', 'New Account Name', ['New Account Bank', '$0.00'])
  end
end
