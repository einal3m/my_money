#
#  Transaction
#  
#  id: int, primary key
#  date: date
#  fitid: string
#  memo: string
#  amount: decimal
#  account_id: int, foreign key
#  category_id: int, foreign key, ('I', 'E' or 'T')
#  subcategory_id: int foreign key
#  

class Transaction < ActiveRecord::Base

    # model relationships
	belongs_to :account
	belongs_to :category
	belongs_to :subcategory
	belongs_to :reconciliation
	
	# validations
	validates :date, presence: true
	validates :account_id, presence: true
	validates :amount, presence: true, numericality: true
	
	# common lookups
	scope :unreconciled, ->(reconciliation) { where(account: reconciliation.account, reconciliation: nil) }

	# non-persistant attributes
	attr_accessor :add_to_reconciliation

   # set defaults for extra attributes
    after_initialize :defaults

    def defaults
  	  self.add_to_reconciliation = false
    end

end
