# BalanceSearch
#
# This search retrieves the end of day balances for the specfied account for the
# specified date range.  It also includes data for the first and last date of the date range
# for graphing purposes.
class BalanceSearch < Search

	attr_reader :account, :date_range
	LINE_CHART_DF = '%d %b, %Y'

	def initialize(attrs)
		@account = attrs.fetch(:account, nil)
		@date_range = attrs.fetch(:date_range, CurrentMonthDateRange.new)
		@transaction_result = nil
		
	end

	# transaction_query - query to retrieve transactions for the specified account
	# and date range
	def transaction_query
		Transaction.where(account: @account).find_by_date(@date_range).date_order
	end

	# line_data - returns an array of end of day balances with the following format:
	# ["01-Jan-14", 56].  ???Does it need the first and last date in the data???
	def line_data

		# find the last transaction of each date in the date range
		sql_data = transactions.group(:date).having('id = MAX(id)')

		# if there has been no data found, return an empty array
		return [] if sql_data.empty?

		# Only date and balance data is used in the line chart
		data = []
		sql_data.each do |transaction|
			data << [transaction.date.strftime(LINE_CHART_DF), transaction.balance.to_f]
		end

		# if first day of date range not in data, then add it
		if (sql_data.first.date != @date_range.from_date) then 
			eod_balance = @account.eod_balance(@date_range.from_date - 1)
			data.unshift([@date_range.from_date.strftime(LINE_CHART_DF), eod_balance.to_f]) 
		end

		# if last day of date range not in data, then add it
		if (sql_data.last.date != @date_range.to_date) then data << [@date_range.to_date.strftime(LINE_CHART_DF), data.last[1]] end

		return data
	end
end