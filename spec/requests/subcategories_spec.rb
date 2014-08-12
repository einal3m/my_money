require 'rails_helper'

RSpec.describe "Subcategories", :type => :request do
  describe "GET /subcategories" do
    it "works! (now write some real specs)" do
      get subcategories_path
      expect(response.status).to be(200)
    end
  end
end
