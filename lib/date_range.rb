
class DateRange
	
	attr_reader :from_date, :to_date

end

class CurrentMonthDateRange < DateRange

	def initialize(args)
		@from_date = Date.new(Date.today.year, Date.today.month, 1)
		@to_date = Date.new((Date.today>>1).year, (Date.today>>1).month, 1) - 1
	end
	
end

class CustomDateRange < DateRange

	def initialize(args)
		@from_date = Date.parse(args[:from_date])
		@to_date = Date.parse(args[:to_date])
	end

end

class CurrentFinancialYearDateRange < DateRange

	def initialize(args)
		@from_date = Date.new(Date.today.month > 6 ? Date.today.year : Date.today.year-1, 7, 1)
		@to_date = Date.new(Date.today.month > 6 ? Date.today.year+1 : Date.today.year, 6, 30)
	end
	
end

class PreviousFinancialYearDateRange < DateRange

	def initialize(args)
		@from_date = Date.new(Date.today.month > 6 ? Date.today.year-1 : Date.today.year-2, 7, 1)
		@to_date = Date.new(Date.today.month > 6 ? Date.today.year : Date.today.year-1, 6, 30)
	end
	
end

class Last90DaysDateRange < DateRange

	def initialize(args)
		@from_date = Date.today - 90
		@to_date = Date.today
	end
	
end

