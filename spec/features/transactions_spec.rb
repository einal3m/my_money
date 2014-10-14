require 'rails_helper'

feature "Transactions", :type => :feature do

  scenario "User views the transaction list for an account" do

    # given I have an account with some transactions
  	a = FactoryGirl.create(:account, name: 'My New Account')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: "one")
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: "two")
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: "three")
    FactoryGirl.create(:transaction, account: a, date: Date.today << 1, notes: "four")
    FactoryGirl.create(:transaction, account: a, date: Date.today << 2, notes: "five")

    # and I have set up date ranges
    FactoryGirl.create(:date_range_option, description: "Current Month", klass: "CurrentMonthDateRange")
    FactoryGirl.create(:date_range_option, description: "Last 90 Days", klass: "Last90DaysDateRange")

  	# when I go to the accounts index page
    visit "/transactions"

    # and I select my account
    select("My New Account", from: 'account_id')

    # and I click Search
    click_on('Search')

    # then I should see a list of transactions
    expect(page).to have_text("Current Balance:")
    expect(page).to have_text("one")
    expect(page).to have_text("two")
    expect(page).to have_text("three")
    expect(page).not_to have_text("four")
    expect(page).not_to have_text("five")

    # When I select a new date range
    select("Last 90 Days", from: "date_range_option_id")

    # And I click Search
    click_on('Search')

    # Then I should see all 5 transactions
    expect(page).to have_text("one")
    expect(page).to have_text("two")
    expect(page).to have_text("three")
    expect(page).to have_text("four")
    expect(page).to have_text("five")
  end

end
