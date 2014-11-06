require 'rails_helper'
require 'date_range'

RSpec.describe "Search", :type => :class do
	before :each do
		@t1 = FactoryGirl.create(:transaction, date: "2014-01-01", amount: 4.0, subcategory: nil)
		@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @t1.category, subcategory: nil, amount: 10.0)
		@t3 = FactoryGirl.create(:transaction, date: "2014-01-01", category: nil, subcategory: nil, amount: 12.0)
		@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @t1.category, subcategory: nil, amount: 15.0)
		@t5 = FactoryGirl.create(:transaction, date: "2014-01-03", category: nil, subcategory: nil, amount: 5.00)
		@t6 = FactoryGirl.create(:transaction, date: "2014-03-02", category: @t1.category, subcategory: nil)
		@t7 = FactoryGirl.create(:transaction, date: "2014-03-03", category: nil, subcategory: nil)

		@dr = CustomDateRange.new({from_date: "2014-01-01", to_date: "2014-02-28"})
	end

	describe "Category Search" do
		it "sets default values if no arguments given" do
			search = CategorySearch.new({})
			expect(search.category).to be_nil
		end

		it "returns transactions for the given category" do

			search = CategorySearch.new({date_range: @dr, category: @t1.category})
			expect(search.transactions).to eq([@t4, @t2, @t1]) 
		
		end

		it "returns transactions with no category if category not specified" do

			search = CategorySearch.new({date_range: @dr, category: nil})
			expect(search.transactions).to eq([@t5, @t3]) 

		end

		it "returns the sum of all transactions" do
			search = CategorySearch.new({date_range: @dr, category: @t1.category})
			expect(search.sum).to eq(29) #15+10+4
		end

		it "returns a summary of all transactions by month" do
			search = CategorySearch.new({date_range: @dr, category: @t1.category})
			expect(search.bar_chart).to eq([["Jan-14", 14],["Feb-14", 15]])
		end
	end
end