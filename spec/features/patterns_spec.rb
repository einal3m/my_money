require 'rails_helper'

feature "Patterns", :type => :feature do
  scenario "User views the patterns list for an account" do

  	account = FactoryGirl.create(:account, name: 'My Account')
  	pattern = FactoryGirl.create(:pattern, account: account, match_text: "Pattern Spec Match")

  	# go to the patterns index page, select your account and click refresh
    visit "/patterns"
    within(".panel-heading") do
	  select('My Account', :from => 'account_id')
      click_on('Refresh')
    end

    # should see a list of patterns for this account
    expect(page).to have_text("Pattern Spec Match")

  end

  scenario "User creates a new Pattern", :js => true do

  	account = FactoryGirl.create(:account, name: 'My Account')
  	subcategory = FactoryGirl.create(:subcategory)

  	# go to the patterns index page, select your account and click refresh
    visit "/patterns"
    within(".panel-heading") do
	  select('My Account', :from => 'account_id')
      click_on('Refresh')
    end

    # click on the new button
    within("h1") do
    	find(".btn").click
    end

    # expect to see a new form
    expect(page).to have_content("New Pattern")
    expect(page).to have_selector('form')

    # enter data into the form
    fill_in 'Match text', :with => 'My Match Text'
	  select(subcategory.category.name, :from => 'pattern_category_id')

	  # selecting category, should make the subcategory name appear in the 
	  # subcategory select box
	  expect(page).to have_content(subcategory.name)

		select(subcategory.name, :from => 'pattern_subcategory_id')
		click_on('Save')

		# should see our new pattern on the index page
    expect(page).to have_text("Pattern was successfully created.")
    expect(page).to have_text("My Match Text")
  end

  scenario "User edits a pattern" do

  	account = FactoryGirl.create(:account, name: 'My Account')
  	pattern = FactoryGirl.create(:pattern, account: account, match_text: "Pattern Spec Match")

  	# go to the patterns index page, select your account and click refresh
    visit "/patterns"
    within(".panel-heading") do
	  select('My Account', :from => 'account_id')
      click_on('Refresh')
    end

    # click on the edit button for the pattern
    within('tr', text: 'My Account') do
    	find('a').click
    end

    # should see the edit form for this page
    expect(page).to have_text("Edit Pattern")
    expect(page).to have_selector('form')

    # edit the pattern
    fill_in('Match text', with: "New Match Text")
    click_on('Save')

    # user should see the new text
    expect(page).to have_text("Patterns")
    expect(page).to have_text("New Match Text")

  end
end
