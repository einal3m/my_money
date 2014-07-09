#
#  Pattern
#  
#  id: int, primary key
#  account_id: int, foreign key
#  match_text: string
#  category_id: int, foreign key
#  subcategory_id: int foreign key
#  
class Pattern < ActiveRecord::Base
    # model relationships
	belongs_to :account
	belongs_to :category
	belongs_to :subcategory
	
	# validations
	validates :account_id, presence: true
	validates :category_id, presence: true
	validates :match_text, presence: true
		
end
