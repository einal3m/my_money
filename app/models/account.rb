#
#  Account
#  
#  id: int, primary key
#  name: string
#  bank: string
#  starting_balance: decimal
#  starting_date: date
#  

class Account < ActiveRecord::Base

    # model relationships
	has_many :transactions
	has_many :patterns
	has_many :reconciliations
	
	# validations
	validates :name, presence: true
	validates :starting_balance, presence: true, numericality: true
	validates :starting_date, presence: true
	

	# current_balance gets the balance of the last transaction, or if none
	# exist, then the starting balance of the account
	def current_balance

	  # if there are no transactions, return starting balance of account
	  if self.transactions.length == 0 then return self.starting_balance end

	  # otherwise return balance of last transaction
	  return self.transactions.order(date: :asc, id: :asc).last.balance
	end

	# eod_balance gets the end of day balance for this account for the given date
	def eod_balance(date)
		last_transaction = self.transactions.where("date <= ?", date).date_order.last

		return last_transaction.nil? ? self.starting_balance : last_transaction.balance
	end
end
