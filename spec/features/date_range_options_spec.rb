require 'rails_helper'

feature "DateRangeOptions", :type => :feature do

	scenario "User views the date range options" do
		# Given I have some date range options
		dr1 = FactoryGirl.create(:date_range_option, description: "Custom")
		dr2 = FactoryGirl.create(:date_range_option, description: "Another")

		# When I visit the date range options index page
		visit '/date_range_options'

		# Then I see a list of options
		expect(page).to have_text('Custom')
		expect(page).to have_text('Another')

		# And a form for new options
		expect(page).to have_selector('form#new_date_range_option')
	end

	scenario "User adds a new date range option" do

		# Given I am on the date_range_option index page
		visit '/date_range_options'

		# When I click on New
		click_on '+ New'

		# and I enter some text
		fill_in('date_range_option_description', with: "New Date Range")
		fill_in('date_range_option_klass', with: "Lib::CurrentMonthDateRange")

		# And click Save
		click_on('Save')

		# Then a new date range is created
		expect(page).to have_text("New Date Range")
		expect(page).to have_text("Lib::CurrentMonthDateRange")

		# And it should have an order of 1 and default to true
		expect(page).to have_text("1")
		within('tr', text: "New Date Range") do
			expect(page).to have_text("true")
		end

		# And I see a message
		expect(page).to have_text("successfully created")

		# When I add another date range
		fill_in('date_range_option_description', with: "Another Date Range")
		fill_in('date_range_option_klass', with: "Lib::Last90DaysDateRange")

		# And click Save
		click_on('Save')

		# Then I see the new date range information
		expect(page).to have_text("Another Date Range")
		expect(page).to have_text("Lib::Last90DaysDateRange")
		expect(page).to have_text("2")
		within('tr', text: "Another Date Range") do
			expect(page).to have_text("false")
		end

		# And I see a message
		expect(page).to have_text("successfully created")
	end

	scenario "user updates a date range option" do
		# Given that I have a date range
		FactoryGirl.create(:date_range_option, description: "First Date Range", klass: "Lib::CurrentMonthDateRange")
		FactoryGirl.create(:date_range_option, description: "My Date Range", klass: "Lib::Last90DaysDateRange")

		# And I am on the date range index page
		visit('/date_range_options')

		# When I click the 'edit' link
		within('tr', text: 'My Date Range') do
    	find('a').click
    end

		# Then I see the edit date range view
		expect(page).to have_text("edit date range option")

		# And my date range object details
		expect(find_field('date_range_option_description').value).to eq("My Date Range")
		expect(find_field('date_range_option_klass').value).to eq("Lib::Last90DaysDateRange")

		# When I fill in new values
		fill_in('date_range_option_description', with: "New Date Range")
		fill_in('date_range_option_klass', with: "Lib::CustomDateRange")
		check('date_range_option_default')

		# And click the save button
		click_on('Save')

		# Then I see the index page
		expect(page).to have_text("date range options")

		# And see the new values
		expect(page).to have_text("New Date Range")
		expect(page).to have_text("Lib::CustomDateRange")

		# And updated record should have default set
		within('tr', text: "New Date Range") do
			expect(page).to have_content("true")
		end

		# And first record should have default not set
		within('tr', text: "First Date Range") do
			expect(page).to have_content("false")
		end

		# and an update message
		expect(page).to have_text("successfully updated")
	end

	scenario "User deletes a date range option", js: true do
		# Given I have a date range option
		FactoryGirl.create(:date_range_option, description: "First Date Range", klass: "Lib::CurrentMonthDateRange")
		FactoryGirl.create(:date_range_option, description: "Second Date Range", klass: "Lib::Last90DaysDateRange")

		# And I am on the index page
		visit('/date_range_options')

		# When I click on edit for the default date range
		within('tr', text: 'First Date Range') do
    	find('a').click
    end

    # Then I see no delete button
    expect(page).not_to have_button('Delete')

    # When I return to the index page
    click_on('Cancel')

		# When I click on edit for the second date range
		within('tr', text: 'Second Date Range') do
    	find('a').click
    end

		# And I click on delete
		click_on('Delete')

		# and I respond to the javascript alert
		page.driver.browser.switch_to.alert.accept

		# Then I am back on the index page
		expect(page).to have_text('date range options')

		# And the date range option is gone
		expect(page).not_to have_text('Second Date Range')

		# And I see a deleted message
		expect(page).to have_text('successfully deleted')
	end

end
