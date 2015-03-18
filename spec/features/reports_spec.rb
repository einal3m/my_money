require 'rails_helper'

feature "Reports", :type => :feature do

	after(:all) {
    DatabaseCleaner.clean
	}

  scenario "User views the categories report", :js => true do
  	# Given I have some transactions
  	sc = FactoryGirl.create(:subcategory)
  	c = sc.category
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)

    # And I have some few date ranges
    FactoryGirl.create(:date_range_option, description: "Current Month", klass: "Lib::CurrentMonthDateRange", default: true)
    FactoryGirl.create(:date_range_option, description: "Custom Dates", klass: "Lib::CustomDateRange")

  	# And that I am on the Category reports page
  	visit ('/report/category')

  	# When I select a category and date range
    select(c.name, from: 'category_id')
    select("Current Month", from: 'date_range_option_id')

    # Then I expect to not see custom dates
    expect(page).not_to have_field('from_date')
    expect(page).not_to have_field('to_date')

  	# When I click Search
    click_on('Search')

  	# Then I see a graph
  	expect(page).to have_content('Graph')

  	# When that I click on the data tab
  	click_on('Data')

  	# Then I should see a data and chart tab
  	within('.nav-tabs') do
  		expect(page).to have_link('Data')
  		expect(page).to have_link('Graph')
    end

  	# And I should see data
  	expect(page.all('tbody tr').count).to eq(4)
  	expect(page).to have_content('Total')

  	# When I select the Custom Dates the date range
  	select("Custom Dates", from: 'date_range_option_id')

  	# Then I should see the custom date range appear
    expect(page).to have_field('from_date')
    expect(page).to have_field('to_date')

  	# When I fill in my custom dates
  	fill_in('from_date', with: Date.today << 1)
  	fill_in('to_date', with: Date.today >> 1)

  	# And I click Search
  	click_on('Search')

  	# Then I see a new graph
  	expect(page).to have_content('Graph')

  	# And the date info should be visible
  	expect(find_field('from_date').value).to eq((Date.today << 1).to_s)
  	expect(find_field('to_date').value).to eq((Date.today >> 1).to_s)

  	# When I click on Data
  	click_on('Data')

  	# And I should see data
  	expect(page.all('tbody tr').count).to eq(4)
  	expect(page).to have_content('Total')

  end

  scenario "User views the sub-categories report", :js => true do
  	# Given I have some transactions
  	sc = FactoryGirl.create(:subcategory)
  	c = sc.category
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)
  	FactoryGirl.create(:transaction, category: c, subcategory: nil, date: Date.today)
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)

    # And I have some few date ranges
    FactoryGirl.create(:date_range_option, description: "Current Month", klass: "Lib::CurrentMonthDateRange", default: true)
    FactoryGirl.create(:date_range_option, description: "Custom Dates", klass: "Lib::CustomDateRange")

  	# And that I am on the Category reports page
  	visit ('/report/subcategory')

  	# When I select a category and date range
    select(c.name, from: 'category_id')
    select(sc.name, from: 'subcategory_id')
    select("Current Month", from: 'date_range_option_id')

    # Then I expect to not see custom dates
    expect(page).not_to have_field('from_date')
    expect(page).not_to have_field('to_date')

  	# When I click Search
    click_on('Search')

    # Then I see a new graph
    expect(page).to have_content('Graph')

    # When I click on Data
    click_on('Data')

  	# Then I should see data
  	expect(page.all('tbody tr').count).to eq(3)
  	expect(page).to have_content('Total')

  	# When I select the Custom Dates the date range
  	select("Custom Dates", from: 'date_range_option_id')

  	# Then I should see the custom date range appear
    expect(page).to have_field('from_date')
    expect(page).to have_field('to_date')

  	# When I fill in my custom dates
  	fill_in('from_date', with: Date.today << 1)
  	fill_in('to_date', with: Date.today >> 1)

  	# And I click Search
  	click_on('Search')

  	# Then the date info should be visible
  	expect(find_field('from_date').value).to eq((Date.today << 1).to_s)
  	expect(find_field('to_date').value).to eq((Date.today >> 1).to_s)

    # When I click on Data
    click_on('Data')

  	# Then I should see data
  	expect(page.all('tbody tr').count).to eq(3)
  	expect(page).to have_content('Total')

  end

end
