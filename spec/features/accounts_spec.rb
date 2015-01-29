require 'rails_helper'

feature "Accounts", :type => :feature do

  before(:all) {
    # create a few date ranges
    FactoryGirl.create(:date_range_option, description: "Current Month", klass: "CurrentMonthDateRange", default: true)
    FactoryGirl.create(:date_range_option, description: "Custom Dates", klass: "CustomDateRange")
  }

  scenario "User views the accounts list for an account", :js => true do

    # given I have an account
  	account = FactoryGirl.create(:account, name: 'My New Account')

  	# when I go to the accounts index page
    visit "/start_backbone"

    # then I should see a list of accounts
    expect(page).to have_text("Account Summary")
    expect(page).to have_text("My New Account")
    expect(page).to have_text("Current Balance")
    expect(page).to have_text("Net Worth")

  end

  scenario "User creates a new Account", :js => true do

  	# when I go to the accounts index page
    visit "/start_backbone"

    # and click on the new button
    within("h1") do
    	find(".btn").click
    end

    # then I expect to see a new form
    expect(page).to have_content("New Account")

    # when I enter data into the form
    fill_in 'Name', with: 'New Account Name'
    fill_in 'Bank', with: 'New Account Bank'
    fill_in 'starting_balance', with: '10.00'
    fill_in 'starting_date', with: '2000-09-09'

    # and I click 'save'
		click_on('Save')

		# then I should see our new pattern on the index page
    expect(page).to have_text("New Account Name")
    expect(page).to have_text("New Account Bank")

  end

  scenario "User edits an account", :js => true do

    # given I have an account
  	account = FactoryGirl.create(:account, name: 'My Edit Account')

  	# when I go to the accounts index page
    visit "/start_backbone"

    # and I click on the edit button for the account
    click_link('edit')
#    within('tr', text: 'My Edit Account') do
#    	find('a').click
#    end

    # then I should see the edit form for this page
    expect(page).to have_text("Edit Account")

    # when I edit the pattern
    fill_in('Name', with: "New Account Name")

    # and I click 'save'
    click_on('Save')

    # then I should see the new account details on the account summary page
    expect(page).to have_text("Account Summary")
    expect(page).to have_text("New Account Name")

  end

  scenario "User views transactions for an account", :js => true do

    # given I have an account with 2 transactions
    account = FactoryGirl.create(:account, name: 'Test Account')
    FactoryGirl.create(:transaction, account: account, notes: "txn1", date: Date.today)
    FactoryGirl.create(:transaction, account: account, notes: "txn2", date: Date.today)

    # and I go to the accounts index page
    visit "/start_backbone"

    # when I click on the account name
    click_link("Test Account")

    # then I see the "Test Account" is selected
    expect(page).to have_select('account_id', selected: 'Test Account')

    # and I see a list of transactions
    expect(page).to have_content("txn1")
    expect(page).to have_content("txn2")

  end
end
