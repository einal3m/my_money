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


	# month_totals - takes the result of the transaction search and groups the results
	# by month and sums the amounts
	def month_totals

		# if the category is an expense, we need to reverse the sign
  	factor = 1
    if !@category.nil? && (@category.category_type.name == "Expense") then factor = -1 end

		# group transactions by date and sum the amount. This returns a hash with the
		# format: {"01-Feb" => 56}
		sql_data = transactions.group("strftime('%m-%Y', date)").sum("#{factor} * amount")

		return generate_summary(sql_data)
	end


end
