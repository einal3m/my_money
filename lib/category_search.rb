# CategorySearch
#
# Allows searches based on category, always uses date range, if none is supplied then the default
# date range is used.
class CategorySearch < Search

	attr_reader :category, :date_range

	def initialize(attrs)
		@category = attrs.fetch(:category, nil)
		@date_range = attrs.fetch(:date_range, CurrentMonthDateRange.new)
		@transaction_result = nil
	end


	# transactions - queries the transaction model for all transactions with the given
	# category and date range. When this method is first called, it runs the query and
	# saves the result to an instance variable. Subsequent calls just returns this result
	def transactions
		if @transaction_result.nil? then
			@transaction_result = Transaction.where(category: @category).find_by_date(@date_range).reverse_date_order
		end
		return @transaction_result
	end

end
