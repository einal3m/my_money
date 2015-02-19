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
    visit "/my_money"

    # then I should see a list of accounts
    expect(page).to have_text("my accounts")
    expect(page).to have_text("Account Summary")
    expect(page).to have_text("My New Account")
    expect(page).to have_text("Current Balance")
    expect(page).to have_text("Net Worth")
  end

  scenario "User creates a new Account", :js => true do

  	# when I go to the accounts index page
    visit "/my_money"

    # and click on the new button
    click_on('new')

    # then I expect to see a new form
    expect(page).to have_content("new account")

    # when I enter data into the form
    fill_in 'name', with: 'New Account Name'
    fill_in 'bank', with: 'New Account Bank'
    fill_in 'starting_balance', with: '10.00'
    fill_in 'starting_date', with: '09-Sep-2000'

    # and I click 'save'
		click_on('save')

		# then I should see our new pattern on the account summary page
    expect(page).to have_text("account summary")
    expect(page).to have_text("New Account Name")
    expect(page).to have_text("New Account Bank")
  end

  scenario "User edits an account", :js => true do

    # given I have an account
  	account = FactoryGirl.create(:account, name: 'My Edit Account')

  	# when I go to the accounts index page
    visit "/my_money"

    # and I click on the show button for the account
    click_on('show')

    # then I should see the show page
    expect(page).to have_text("account summary")

    # when I click on the edit button
    click_on("edit")

    # then I should see the edit form for this page
    expect(page).to have_text("Edit Account")

    # when I edit the pattern
    fill_in('name', with: "New Account Name")

    # and I click 'save'
    click_on('save')

    # then I should see the new account details on the account summary page
    expect(page).to have_text("account summary")
    expect(page).to have_text("New Account Name")
  end

  scenario "User deletes an account", :js => true do
  
    # given I have an account
    account = FactoryGirl.create(:account, name: 'My Edit Account')

    # when I go to the accounts index page
    visit "/my_money"

    # and I click on show
    click_on('show')

    # and I click on edit
    click_on('edit')

    # and I click on delete and click ok
    click_on('delete')
    page.driver.browser.switch_to.alert.accept

    # then I see the index page
    expect(page).to have_text('my accounts')
    expect(page).not_to have_text('My Edit Account')
  end
end
