require 'rails_helper'

feature "Accounts", :type => :feature do
  scenario "User views the accounts list for an account" do

  	account = FactoryGirl.create(:account, name: 'My New Account')

  	# go to the accounts index page
    visit "/accounts"

    # should see a list of accounts
    expect(page).to have_text("Account Summary")
    expect(page).to have_text("My New Account")
    expect(page).to have_text("Current Balance")
    expect(page).to have_text("Net Worth")

  end

  scenario "User creates a new Account" do

  	# go to the accounts index page
    visit "/accounts"

    # click on the new button
    within("h1") do
    	find(".btn").click
    end

    # expect to see a new form
    expect(page).to have_content("New Account")
    expect(page).to have_selector('form')

    # enter data into the form
    fill_in 'Name', with: 'New Account Name'
    fill_in 'Bank', with: 'New Account Bank'
    fill_in 'Starting balance', with: '10.00'
		click_on('Save')

		# should see our new pattern on the index page
    expect(page).to have_text("Account was successfully created.")
    expect(page).to have_text("New Account Name")
    expect(page).to have_text("New Account Bank")
  end

  scenario "User edits an account" do

  	account = FactoryGirl.create(:account, name: 'My Edit Account')

  	# go to the patterns index page, select your account and click refresh
    visit "/accounts"

    # click on the edit button for the pattern
    within('tr', text: 'My Edit Account') do
    	find('a').click
    end

    # should see the edit form for this page
    expect(page).to have_text("Edit Account")
    expect(page).to have_selector('form')

    # edit the pattern
    fill_in('Name', with: "New Account Name")
    click_on('Save')

    # user should see the new text
    expect(page).to have_text("Account Summary")
    expect(page).to have_text("New Account Name")

  end
end
