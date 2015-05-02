require 'rails_helper'

feature 'Reconciliations', type: :feature do
  before :all do
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
  end

  after :all do
    DatabaseCleaner.clean
  end

  scenario 'User performs bank reconciliation', js: true do
    account = FactoryGirl.create(:account, name: 'My Account', starting_balance: 1000, starting_date: '2014-07-01')
    FactoryGirl.create(:transaction, account: account, date: '2014-07-02', amount: 2500, reconciliation: nil)
    FactoryGirl.create(:transaction, account: account, date: '2014-07-03', amount: 1500, reconciliation: nil)
    FactoryGirl.create(:transaction, account: account, date: '2014-07-04', amount: 200, reconciliation: nil)
    FactoryGirl.create(:transaction, account: account, date: '2014-07-05', amount: 10_000, reconciliation: nil)

    visit_accounts
    click_on 'show'
    click_on 'reconcile'

    expect(page).to have_text('account reconciliation')

    fill_in 'statement_balance', with: 50.00
    fill_in 'statement_date', with: '02-Jul-2014'
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
