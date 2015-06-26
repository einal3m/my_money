require 'rails_helper'

feature 'Reconciliations', type: :feature do
  before :all do
    FactoryGirl.create(:category_type, name: 'Expense')
    @ct_i = FactoryGirl.create(:category_type, name: 'Income')
    c1 = FactoryGirl.create(:category, name: 'First Category', category_type: @ct_i)
    c2 = FactoryGirl.create(:category, name: 'Second Category', category_type: @ct_i)
    FactoryGirl.create(:subcategory, name: 'First Subcategory', category: c1)
    FactoryGirl.create(:subcategory, name: 'Second Subcategory', category: c2)
  end

  after :all do
    DatabaseCleaner.clean
  end

  scenario 'User performs bank reconciliation', js: true do
    start_my_money
    visit_accounts
    create_account('Savings', {
      name: 'My Rec Account',
      starting_date: '1-Jul-2014',
      starting_balance: '10.00'
    })
    visit_account_transactions 'My Rec Account'

    create_transaction(date: '2-Jul-2014', amount: '25.00')
    create_transaction(date: '3-Jul-2014', amount: '15.00')
    create_transaction(date: '4-Jul-2014', amount: '2.00')
    create_transaction(date: '5-Jul-2014', amount: '100.00')

    visit_accounts
    show_account('My Rec Account')

    # FactoryGirl.create(:transaction, account: account, date: '2014-07-02', amount: 2500, reconciliation: nil)
    # FactoryGirl.create(:transaction, account: account, date: '2014-07-03', amount: 1500, reconciliation: nil)
    # FactoryGirl.create(:transaction, account: account, date: '2014-07-04', amount: 200, reconciliation: nil)
    # FactoryGirl.create(:transaction, account: account, date: '2014-07-05', amount: 10_000, reconciliation: nil)

    click_on 'reconcile'

    expect(page).to have_text('account reconciliation')

    fill_in 'statement_balance', with: 50.00
    fill_in 'statement_date', with: '2-Jul-2014'
    click_on 'Start'

    expect(page).to have_text('2-Jul-2014')
    expect(page).to have_text('$50.00')
    expect(page.all('tbody tr').count).to eq(4)
    expect(page).to have_button('done', disabled: true)
    expect(find('#reconciliation_balance')).to have_content('$35.00')
    expect(find('#balance_difference')).to have_content('$15.00')

    within 'tr', text: '15.00' do
      find('input').set(true)
    end

    expect(find('#reconciliation_balance')).to have_content('$50.00')
    expect(find('#balance_difference')).to have_content('$ --')
    expect(page).to have_button('done', disabled: false)

    click_on 'Done'
    expect(page).to have_text('account summary')
  end
end
