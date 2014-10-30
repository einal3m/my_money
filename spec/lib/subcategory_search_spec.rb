require 'rails_helper'
require 'date_range'

RSpec.describe SubcategorySearch, :type => :class do
	before :each do
		@sc = FactoryGirl.create(:subcategory)
		@c = @sc.category
		@t1 = FactoryGirl.create(:transaction, date: "2014-01-01", category: @c, amount: 4.0, subcategory: @sc)
		@t2 = FactoryGirl.create(:transaction, date: "2014-01-02", category: @c, subcategory: nil, amount: 10.0)
		@t3 = FactoryGirl.create(:transaction, date: "2014-01-01", category: nil, subcategory: nil, amount: 12.0)
		@t4 = FactoryGirl.create(:transaction, date: "2014-02-02", category: @c, subcategory: nil, amount: 15.0)
		@t5 = FactoryGirl.create(:transaction, date: "2014-01-03", category: @c, subcategory: @sc, amount: 5.00)
		@t6 = FactoryGirl.create(:transaction, date: "2014-03-02", category: @c, subcategory: nil)
		@t7 = FactoryGirl.create(:transaction, date: "2014-03-03", category: @c, subcategory: @sc)

		@dr = CustomDateRange.new({from_date: "2014-01-01", to_date: "2014-02-28"})
	end

	it "sets default values if no arguments given" do
		search = SubcategorySearch.new({})
		expect(search.category).to be_nil
		expect(search.subcategory).to be_nil
	end

	it "returns transactions for the given category" do

		search = SubcategorySearch.new({date_range: @dr, category: @c, subcategory: @sc})
		expect(search.transactions).to eq([@t5, @t1]) 
	
	end

	it "returns transactions with no subcategory if subcategory not specified" do

		search = SubcategorySearch.new({date_range: @dr, category: @c})
		expect(search.transactions).to eq([@t4, @t2]) 

	end

	it "returns the sum of all transactions" do
		search = SubcategorySearch.new({date_range: @dr, category: @c, subcategory: @sc})
		expect(search.sum).to eq(9.0) #5+4
	end

	it "returns a summary of all transactions by month" do
		search = SubcategorySearch.new({date_range: @dr, category: @c, subcategory: @sc})
		expect(search.month_totals).to eq([["Jan-14", 9],["Feb-14", 0]])
	end
end