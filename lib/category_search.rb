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

	# transaction_query - query to retrieve transactions for the specified category
	# and date range
	def transaction_query
		Transaction.where(category: @category).find_by_date(@date_range).reverse_date_order
	end

end
