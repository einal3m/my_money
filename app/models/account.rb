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
end
