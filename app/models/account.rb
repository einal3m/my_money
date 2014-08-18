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
	
end
