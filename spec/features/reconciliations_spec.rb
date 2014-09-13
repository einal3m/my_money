require 'rails_helper'

feature "Reconciliations", :type => :feature do

	after(:all) {
    DatabaseCleaner.clean
	}

  scenario "User performs bank reconciliation", :js => true do
  	# Given we have an account with some transactions
  	account = FactoryGirl.create(:account, name: "My Account", starting_balance: 10.00, starting_date: "2014-07-01")
  	transaction1 = FactoryGirl.create(:transaction, account: account, date: "2014-07-02", amount: 25.00, reconciliation: nil)
  	transaction2 = FactoryGirl.create(:transaction, account: account, date: "2014-07-03", amount: 15.00, reconciliation: nil)
  	transaction3 = FactoryGirl.create(:transaction, account: account, date: "2014-07-04", amount: 2.00, reconciliation: nil)
  	transaction4 = FactoryGirl.create(:transaction, account: account, date: "2014-07-05", amount: 100.00, reconciliation: nil)
  	
  	# and we are on the transactions list page
  	visit('/transactions')

    # select the account and click refresh
    select('My Account', from: 'account_id')
    click_on('Refresh')

  	# Click on the Reconcile button
  	click_on('Reconcile')

  	# expect to see the new form
  	expect(page).to have_text('New Reconciliation')
  	expect(page).to have_selector('form')

  	# select account, fill in statement balance and date
  	select('My Account', from: 'reconciliation_account_id')
  	fill_in('Statement balance', with: 50.00)
  	select('2014', from: 'reconciliation_statement_date_1i')
  	select('July', from: 'reconciliation_statement_date_2i')
  	select('3', from: 'reconciliation_statement_date_3i')

  	# expect to see previous balance and date calculated
  	expect(find('#reconciliation_last_reconciled_date').value).to eq("2014-07-01")
  	expect(find('#reconciliation_last_reconciled_balance').value.to_f).to eq(10.00)

  	# click on the Start button
  	click_on('Start')

  	# expect to see a list of transactions, and the Done button to be disabled
    expect(page.all('tbody tr').count).to eq(4)
    expect(page).to have_button('Done', disabled: true)

    # expect to see the reconciled balance equal to the last statement balance
    expect(find('#reconciled_balance').text).to eq("$10.00")

    # select the transactions to be reconciled
    within(find("tr", text:"$25.00")){ check("transaction_add_to_reconciliation") }
    within(find("tr", text:"$15.00")){ check("transaction_add_to_reconciliation") }

    # expect the Done button to be enabled and the balances to be equal
    expect(page).to have_button('Done')
    expect(find('#reconciled_balance').text).to eq("$50.00")
 
  	# click the Done button
    click_on('Done')

    # expect 2 transactions to be reconciled
    within(find("tr", text:"$25.00")){ expect(page).to have_content("R") }
    within(find("tr", text:"$15.00")){ expect(page).to have_content("R") }
    within(find("tr", text:"$2.00")){ expect(page).not_to have_content("R") }
    within(find("tr", text:"$100.00")){ expect(page).not_to have_content("R") }

    # go to the reconciliation index page
    visit('/reconciliations')

  	# expect the reconciliation to be completedt
    expect(find("tr", text:"My Account")).to have_css("span")
 
  end
end
