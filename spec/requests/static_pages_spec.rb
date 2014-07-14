require 'rails_helper'

describe "Static pages" do

  describe "Home page" do

    it "should have the content 'My Money'" do
      visit '/static_pages/home'
      expect(page).to have_content('My Money')
    end
  end
end