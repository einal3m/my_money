require 'rails_helper'

RSpec.describe ReportController, :type => :controller do

	describe "category report" do

		before :each do
			@t1 = FactoryGirl.create(:transaction, date: "2014-01-01")
			@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category)
			@t3 = FactoryGirl.create(:transaction, date: "2014-01-01", category: nil)
			@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @t1.category)
			@t5 = FactoryGirl.create(:transaction, date: "2014-01-03", category: nil)
		end

		it "returns all transactions for the specified category and date range" do
      get :category, {:category_id => @t1.category.id, from_date: "2014-01-01", to_date: "2014-01-31"}

      expect(assigns(:transactions)).to eq([@t2, @t1])
		end

		it "returns all transactions without categories when none is supplied" do

      get :category, {from_date: "2014-01-01", to_date: "2014-01-31"}
      expect(assigns(:transactions)).to eq([@t5, @t3])

		end

	end

	describe "subcategory report" do

		before :each do
			@t1 = FactoryGirl.create(:transaction, date: "2014-01-01")
			@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category, subcategory: @t1.subcategory)
			@t3 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category, subcategory: nil)
			@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @t1.category, subcategory: @t1.subcategory)
			@t5 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category, subcategory: nil)
		end


		it "returns all transactions for the specfied subcategory" do
			get :subcategory, {:category_id => @t1.category, :subcategory_id => @t1.subcategory, from_date: "2014-01-01", to_date: "2014-01-31" }
      expect(assigns(:transactions)).to eq([@t2, @t1])
		end

		it "returns all transactions for category and no subcategory" do
			get :subcategory, {:category_id => @t1.category, from_date: "2014-01-01", to_date: "2014-01-31" }
      expect(assigns(:transactions)).to eq([@t5, @t3])
		end
	end

end
