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
	
	# validations
	validates :date, presence: true
	validates :account_id, presence: true
	validates :amount, presence: true, numericality: true
	
	# common transaction queries
	scope :date_between, ->(from_date, to_date) { where(date: from_date..to_date) }
	scope :category_type, ->(category_type) { where(category_id: category_type.categories) }
	scope :no_category, -> { where(category_id: nil) }

end
