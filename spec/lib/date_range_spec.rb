require 'rails_helper'

RSpec.describe DateRange, :type => :class do

	describe "DateRange valid?" do
		it "tests if given string is a valid DateRange class" do
			expect(DateRange.valid?("NotAClass")).to be_falsey
			expect(DateRange.valid?("ddd")).to be_falsey
			expect(DateRange.valid?("444")).to be_falsey
			expect(DateRange.valid?("String")).to be_falsey
			expect(DateRange.valid?("CurrentMonthDateRange")).to be_truthy
		end
	end

	describe "CurrentMonthDateRange" do

		it "sets from date to first day of current month" do
			dr = CurrentMonthDateRange.new
			expect(dr.from_date).to eq(Date.new(Date.today.year, Date.today.month, 1))
		end

		it "sets to date to last day of current month" do
			dr = CurrentMonthDateRange.new
			expect(dr.to_date).to eq(Date.new((Date.today>>1).year,(Date.today>>1).month,1)-1)
		end

	end

	describe "CustomDateRange" do

		it "sets from date and to date to those passed in as parameters" do
			dr = CustomDateRange.new({from_date: "2014-12-19", to_date: "2014-12-31"})

			expect(dr.from_date).to eq(Date.new(2014, 12, 19))
			expect(dr.to_date).to eq(Date.new(2014, 12, 31))
		end

		it "sets from date and to date to today if not supplied" do
			dr = CustomDateRange.new

			expect(dr.from_date).to eq(Date.today)
			expect(dr.to_date).to eq(Date.today)
		end

	end

	describe "CurrentFinancialYearDateRange" do
		it "sets from date to start of current financial year" do
			dr = CurrentFinancialYearDateRange.new
			expect(dr.from_date).to eq(Date.new(Date.today.month > 6 ? Date.today.year : Date.today.year-1, 7, 1))
		end

		it "sets to date to end of current financial year" do
			dr = CurrentFinancialYearDateRange.new
			expect(dr.to_date).to eq(Date.new(Date.today.month > 6 ? Date.today.year+1 : Date.today.year, 6, 30))
		end

	end
	describe "PreviousFinancialYearDateRange" do
		it "sets from date to start of previous financial year" do
			dr = PreviousFinancialYearDateRange.new
			expect(dr.from_date).to eq(Date.new(Date.today.month > 6 ? Date.today.year-1 : Date.today.year-2, 7, 1))
		end

		it "sets to date to end of previous financial year" do
			dr = PreviousFinancialYearDateRange.new
			expect(dr.to_date).to eq(Date.new(Date.today.month > 6 ? Date.today.year : Date.today.year-1, 6, 30))
		end

	end

	describe "Last90DaysDateRange" do
		it "sets from date to 90 days ago" do
			dr = Last90DaysDateRange.new
			expect(dr.from_date).to eq(Date.today - 90)
		end

		it "sets to date to today" do
			dr = Last90DaysDateRange.new
			expect(dr.to_date).to eq(Date.today)
		end
	end

end
