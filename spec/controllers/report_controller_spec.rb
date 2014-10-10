require 'rails_helper'

RSpec.describe ReportController, :type => :controller do

	describe "category report" do

		before :each do
			@t1 = FactoryGirl.create(:transaction, date: "2014-01-01", amount: 4.0)
			@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category, amount: 10.0)
			@t3 = FactoryGirl.create(:transaction, date: "2014-01-01", category: nil, amount: 12.0)
			@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @t1.category, amount: 15.0)
			@t5 = FactoryGirl.create(:transaction, date: "2014-01-03", category: nil, amount: 5.00)
			@t6 = FactoryGirl.create(:transaction, date: "2014-03-02", category: @t1.category)
			@t7 = FactoryGirl.create(:transaction, date: "2014-03-03", category: nil)
		end

		it "returns all transactions for the specified category and date range" do
      get :category, {:category_id => @t1.category.id, from_date: "2014-01-01", to_date: "2014-02-28"}

      expect(assigns(:transactions)).to eq([@t4, @t2, @t1])
      expect(assigns(:report_data)).to eq([['Jan-14', 14.0], ['Feb-14', 15.0]])
		end

		it "returns all transactions without categories when none is supplied" do

      get :category, {from_date: "2014-01-01", to_date: "2014-02-28"}
      expect(assigns(:transactions)).to eq([@t5, @t3])
      expect(assigns(:report_data)).to eq([['Jan-14', 17.00], ['Feb-14', 0.00]])
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
