# Search
#
# Base class for all search classes
class Search

	def initialize	
#		@transaction_result = nil
	end

	# sum - returns the sum of all transactions
	def sum
		transactions.sum(:amount)
	end

end