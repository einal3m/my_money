require 'rails_helper'

feature 'Transactions', type: :feature do
  let(:c1) { { name: 'First Category', category_type: 'Income' } }
  let(:c2) { { name: 'Second Category', category_type: 'Expense' } }
  let(:s1) { { name: 'First Subcategory', category_type: 'Income', category: 'First Category' } }
  let(:s2) { { name: 'Second Subcategory', category_type: 'Expense', category: 'Second Category' } }

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates, edits and deletes transactions for a savings account', js: true  do
    visit_categories
    create_category(c1)
    create_category(c2)
    create_subcategory(s1)
    create_subcategory(s2)

    visit_accounts
    create_account 'Savings', {
      name: 'My New Account',
      bank: 'My Bank',
      starting_balance: '10',
      starting_date: format_date(Date.today)
    }
    visit_account_transactions 'My New Account'

    create_transaction(
      date: format_date(Date.today),
      notes: 'First Transaction',
      amount: '25',
      category: 'First Category',
      subcategory: 'First Subcategory'
    )
    verify_transaction('First Transaction', ['25.00', 'First Category/First Subcategory', '$35.00'])

    edit_transaction('First Transaction',
      amount: '50',
      category: 'Second Category',
      subcategory: 'Second Subcategory'
    )
    verify_transaction('First Transaction', ['50.00', 'Second Category/Second Subcategory', '$60.00'])

    delete_transaction 'First Transaction'
    expect(page).not_to have_text('First Transaction')
  end

  scenario 'User filters transactions for an account', js: true  do
    visit_accounts
    create_account 'Savings', {
      name: 'My New Account',
      bank: 'My Bank',
      starting_balance: '10',
      starting_date: format_date(Date.today << 1)
    }
    visit_account_transactions 'My New Account'

    create_transaction(date: format_date(Date.today), amount: 10, notes: 'First Transaction')
    create_transaction(date: format_date(Date.today), amount: 10, notes: 'Second Transaction')
    create_transaction(date: format_date(Date.today), amount: 10, notes: 'Third Transaction')
    create_transaction(date: format_date(Date.yesterday), amount: 10, notes: 'Fourth Transaction')
    create_transaction(date: format_date(Date.tomorrow), amount: 10, notes: 'Fifth Transaction')

    filter_transactions('Custom Dates', Date.today, Date.today)

    expect(page).to have_text('First Transaction')
    expect(page).to have_text('Second Transaction')
    expect(page).to have_text('Third Transaction')
    expect(page).not_to have_text('Fourth Transaction')
    expect(page).not_to have_text('Fifth Transaction')

    filter_transactions('Custom Dates', Date.yesterday, Date.tomorrow)

    expect(page).to have_text('First Transaction')
    expect(page).to have_text('Second Transaction')
    expect(page).to have_text('Third Transaction')
    expect(page).to have_text('Fourth Transaction')
    expect(page).to have_text('Fifth Transaction')
  end
end
