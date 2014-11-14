require 'rails_helper'
require 'date_range'

RSpec.describe BalanceSearch, :type => :class do
	before :each do
		@a = FactoryGirl.create(:account, starting_balance: 0)
		@t1 = FactoryGirl.create(:transaction, account: @a, date: "2014-01-01", amount: 4.0) # 4
		@t2 = FactoryGirl.create(:transaction, account: @a, date: "2014-01-02", amount: 10.0) # 14
		@t3 = FactoryGirl.create(:transaction, account: @a, date: "2014-01-02", amount: -12.0) # 2
		@t4 = FactoryGirl.create(:transaction, account: @a, date: "2014-02-02", amount: 15.0) # 17
		@t5 = FactoryGirl.create(:transaction, account: @a, date: "2014-02-02", amount: 5.00) # 22
		@t6 = FactoryGirl.create(:transaction, account: @a, date: "2014-03-02", amount: -6.00) # 16
		@t7 = FactoryGirl.create(:transaction, account: @a, date: "2014-03-31", amount: 7.00) # 23

		@dr = CustomDateRange.new({from_date: "2014-01-01", to_date: "2014-03-31"})
	end

	it "retrieves the end of day balances for date range" do
		search = BalanceSearch.new({account: @a, date_range: @dr})
		expect(search.line_data).to eq([["01-Jan-14", 4.0], ["02-Jan-14", 2.0], ["02-Feb-14", 22.0], 
										["02-Mar-14", 16.0], ["31-Mar-14", 23.0]])
	end

	it "provides first and last date of date range if no transactions on those days" do
		@t1.update(date: "2014-01-02")
		@t7.update(date: "2014-03-02")

		search = BalanceSearch.new({account: @a, date_range: @dr})
		expect(search.line_data).to eq([["01-Jan-14", 0.0], ["02-Jan-14", 2.0], ["02-Feb-14", 22.0], 
										["02-Mar-14", 23.0], ["31-Mar-14", 23.0]])
	end

	it "returns an empty array, if no data is found" do
		dr_no_data = CustomDateRange.new({from_date: "2013-01-01", to_date: "2013-03-31"})
		search = BalanceSearch.new({account: @a, date_range: dr_no_data})

		expect(search.line_data).to be_empty
	end
end

