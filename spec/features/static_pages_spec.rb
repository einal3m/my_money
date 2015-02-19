require 'rails_helper'

feature "Static Pages", :type => :feature do

  scenario "User views the Home page" do
  	# given I am on the home page
  	visit "/"

  	# THen the page should have a title
  	expect(page).to have_title("my money")

  	# And I should see a navigation bar
  	within '.navbar' do
  		expect(page).to have_content("my money")
  		expect(page).to have_link("accounts")
  		expect(page).to have_link("transactions")
  		expect(page).to have_link("categories")
  		expect(page).to have_link("reports")

  		within '.dropdown' do
  			expect(page).to have_link("category")
  			expect(page).to have_link("sub-category")
  			expect(page).to have_link("income vs expenses")
        expect(page).to have_link("bar chart")
        expect(page).to have_link("account balance")
  		end
    end

  	# And I should see some boxes with links
		expect(page.all('.box').count).to eq(9)

  	# And I should see a footer
  	within '.footer' do
  		expect(page).to have_link("home")
  		expect(page).to have_link("accounts")
  		expect(page).to have_link("transactions")
  		expect(page).to have_link("categories")
  		expect(page).to have_link("patterns")

  		expect(page).to have_link("import OFX file")
  		# expect(page).to have_link("bank reconciliation")
  		expect(page).to have_link("reports")
  	end

	end

end
