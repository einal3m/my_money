require 'rails_helper'

feature "Reports", :type => :feature do

	after(:all) {
    DatabaseCleaner.clean
	}

  scenario "User views the categories report" do
  	# Given I have some transactions
  	sc = FactoryGirl.create(:subcategory)
  	c = sc.category
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)
  	FactoryGirl.create(:transaction, category: c, subcategory: sc, date: Date.today)

  	# And that I am on the Category reports page
  	visit ('/report/category')

  	# And I select a category and date range
    select(c.name, from: 'category_id')

  	# And I click Refresh
    click_on('Refresh')

  	# Then I see a graph
  	expect(page).to have_content('Graph')

  	# Given that I click on the graph tab
  	click_on('Data')

  	# Then I should see a data and chart tab
  	within('.nav-tabs') do
  		expect(page).to have_link('Data')
  		expect(page).to have_link('Graph')
    end

  	# And I should see data
  	expect(page.all('tbody tr').count).to eq(4)
  	expect(page).to have_content('Total')

  end
end
