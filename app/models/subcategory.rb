#
#  Subcategory
#  
#  id: int, primary key
#  name: string
#  category_id: int, foreign key
#  

class Subcategory < ActiveRecord::Base

    # model relationships
	belongs_to :category
	has_many :transactions
	has_many :patterns
	
	# validations
	validates :name, presence: true
	validates :category_id, presence: true
end
