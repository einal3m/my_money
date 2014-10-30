# Search
#
# Base class for all search classes
class Search

	def initialize	
#		@transaction_result = nil
	end

	# transactions - queries the transaction model for all transactions with the given
	# category and date range. When this method is first called, it runs the query and
	# saves the result to an instance variable. Subsequent calls just returns this result
	def transactions
		if @transaction_result.nil? then
			@transaction_result = transaction_query
		end
		return @transaction_result
	end


	# sum - returns the sum of searched transactions
	def sum
		transactions.sum(:amount)
	end



	# generate_summary(sql_data) - takes the results of an activemodel query and converts it 
	# into an array with formatted month-year and sum amount. It also ensures that every month
	# in the date range is included, even if no data exists. The sum is set to zero in this case.
	def generate_summary(sql_data)

    # generate list of months to report on
    months = []
    number_of_months = (@date_range.to_date.year*12+@date_range.to_date.month)-(@date_range.from_date.year*12+@date_range.from_date.month) + 1
    number_of_months.times do |month|
      months[month] = @date_range.from_date >> (month)
    end

    # generate summary array
    summary = []
    months.each do |month_date|
      month_text = month_date.strftime('%m-%Y')
      summary << [month_date.strftime('%b-%y'), sql_data[month_date.strftime('%m-%Y')] || 0.00]    
    end

    return summary
	end




end