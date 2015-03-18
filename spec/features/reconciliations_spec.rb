require 'rails_helper'

feature 'Reconciliations', :type => :feature do
  before(:all) {
    # create a few date ranges
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    FactoryGirl.create(:category_type, name: 'Expense')
    FactoryGirl.create(:category_type, name: 'Income')
  }

  after(:all) {
    DatabaseCleaner.clean
  }

  scenario 'User performs bank reconciliation', :js => true do
    # Given we have an account with some transactions
    account = FactoryGirl.create(:account, name: 'My Account', starting_balance: 1000, starting_date: '2014-07-01')
    FactoryGirl.create(:transaction, account: account, date: '2014-07-02', amount: 2500, reconciliation: nil)
    FactoryGirl.create(:transaction, account: account, date: '2014-07-03', amount: 1500, reconciliation: nil)
    FactoryGirl.create(:transaction, account: account, date: '2014-07-04', amount: 200, reconciliation: nil)
    FactoryGirl.create(:transaction, account: account, date: '2014-07-05', amount: 10_000, reconciliation: nil)

    # and we are on the accounts show page
    visit('/my_money')
    click_on('show')

    # when I click on the Reconcile button
    click_on('reconcile')

    # then I see the new form
    expect(page).to have_text('account reconciliation')

    # when I fill in statement balance and date
    fill_in('statement_balance', with: 50.00)
    fill_in('statement_date', with: '02-Jul-2014')

    # and click on the Start button
    click_on('Start')

    # then I see the reconciliation panel
    expect(page).to have_text('2-Jul-2014')
    expect(page).to have_text('$50.00')

    # and all unreconciled transactions are there
    expect(page.all('tbody tr').count).to eq(4)

    # and the done button is disabled
    expect(page).to have_button('done', disabled: true)

    # and the reconciled balance and difference are calculated
    expect(find('#reconciliation_balance')).to have_content('$35.00')
    expect(find('#balance_difference')).to have_content('$15.00')

    # when I add another transaction
    within('tr', :text => '15.00') do
      find('input').set(true)
    end
    # then the reconciliation balance and difference are updated
    expect(find('#reconciliation_balance')).to have_content('$50.00')
    expect(find('#balance_difference')).to have_content('$ --')

    # and the done button is enabled
    expect(page).to have_button('done', disabled: false)

    # when click the Done button
    click_on('Done')

    # then I go to the account summary page
    expect(page).to have_text('account summary')
  end
end
