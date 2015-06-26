require 'rails_helper'

feature 'Transactions', type: :feature do
  before :each do
    FactoryGirl.create(:category_type, name: 'Expense')
    @ct_i = FactoryGirl.create(:category_type, name: 'Income')
    c1 = FactoryGirl.create(:category, name: 'First Category', category_type: @ct_i)
    c2 = FactoryGirl.create(:category, name: 'Second Category', category_type: @ct_i)
    FactoryGirl.create(:subcategory, name: 'First Subcategory', category: c1)
    FactoryGirl.create(:subcategory, name: 'Second Subcategory', category: c2)
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates, edits and deletes transactions for a savings account', js: true  do
    start_my_money
    visit_accounts
    create_account 'Savings', name: 'My New Account', starting_balance: '10'
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
      date: format_date(Date.today + 1),
      notes: 'Edit Transaction',
      amount: '50',
      category: 'Second Category',
      subcategory: 'Second Subcategory'
    )
    verify_transaction('Edit Transaction', ['50.00', 'Second Category/Second Subcategory', '$60.00'])

    delete_transaction 'Edit Transaction'
    expect(page).not_to have_text('Edit Transaction')    
  end

  scenario 'User filters transactions for an account', js: true  do
    start_my_money
    visit_accounts
    create_account 'Savings', name: 'My New Account'
    visit_account_transactions 'My New Account'

    create_transaction(date: format_date(Date.today), notes: 'First Transaction')
    create_transaction(date: format_date(Date.today), notes: 'Second Transaction')
    create_transaction(date: format_date(Date.today), notes: 'Third Transaction')
    create_transaction(date: format_date(Date.today << 1), notes: 'Fourth Transaction')
    create_transaction(date: format_date(Date.today >> 1), notes: 'Fifth Transaction')

    expect(page).to have_text('First Transaction')
    expect(page).to have_text('Second Transaction')
    expect(page).to have_text('Third Transaction')
    expect(page).not_to have_text('Fourth Transaction')
    expect(page).not_to have_text('Fifth Transaction')
  end
end
