
# DateRange class
# Base class for date range classes used to store from_date and to_date attributes
class DateRange
	
	attr_reader :from_date, :to_date

	# valid? method
	# checks to see if the string passed in, is a valid DateRange class name
	def self.valid?(klass)
		klass.constantize.is_a?(Class)&& klass.constantize.new.is_a?(DateRange)
		rescue NameError => e
			false
	end

end

# CurrentMonthDateRange
# sets from and to dates to represent the current month
class CurrentMonthDateRange < DateRange

	def initialize(args = {})
		@from_date = Date.new(Date.today.year, Date.today.month, 1)
		@to_date = Date.new((Date.today>>1).year, (Date.today>>1).month, 1) - 1
	end
	
end

# CustomDateRange
# sets from and to dates from the values passed in
class CustomDateRange < DateRange

	def initialize(args = {})
		@from_date = Date.parse(args[:from_date] || Date.today.to_s)
		@to_date = Date.parse(args[:to_date] || Date.today.to_s)
	end

end

# CurrentFinancialYearDateRange
# sets from and to dates to represent the current financial year
class CurrentFinancialYearDateRange < DateRange

	def initialize(args = {})
		@from_date = Date.new(Date.today.month > 6 ? Date.today.year : Date.today.year-1, 7, 1)
		@to_date = Date.new(Date.today.month > 6 ? Date.today.year+1 : Date.today.year, 6, 30)
	end
	
end

# PreviousFinancialYearDateRange
# sets from and to dates to represent the previous financial year
class PreviousFinancialYearDateRange < DateRange

	def initialize(args = {})
		@from_date = Date.new(Date.today.month > 6 ? Date.today.year-1 : Date.today.year-2, 7, 1)
		@to_date = Date.new(Date.today.month > 6 ? Date.today.year : Date.today.year-1, 6, 30)
	end
	
end

# Last90DaysDateRange
# sets from and to dates to represent the last 90 days from today
class Last90DaysDateRange < DateRange

	def initialize(args = {})
		@from_date = Date.today - 90
		@to_date = Date.today
	end
	
end

