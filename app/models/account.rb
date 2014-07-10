#
#  Account
#  
#  id: int, primary key
#  name: string
#  bank: string
#  starting_balance: decimal
#  

class Account < ActiveRecord::Base

    # model relationships
	has_many :transactions
	has_many :patterns
	
	# validations
	validates :name, presence: true
	validates :starting_balance, presence: true, numericality: true
	
end
