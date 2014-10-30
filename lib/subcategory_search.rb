# SubcategorySearch
#
# Allows searches based on category and subcategory, always uses date range, if none is supplied then the default
# date range is used.
class SubcategorySearch < Search

	attr_reader :category, :subcategory, :date_range

	def initialize(attrs)
		@category = attrs.fetch(:category, nil)
		@subcategory = attrs.fetch(:subcategory, nil)
		@date_range = attrs.fetch(:date_range, CurrentMonthDateRange.new)
		@transaction_result = nil
	end

	# transaction_query - query to retrieve transactions for the specified category
	# and date range
	def transaction_query
		Transaction.where(category: @category, subcategory: @subcategory).find_by_date(@date_range).reverse_date_order
	end

end
