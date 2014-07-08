#
#  Category
#  
#  id: int, primary key
#  name: string
#  category_type: string ('I', 'E' or 'T')
#  
class Category < ActiveRecord::Base

    # model relationships
	has_many :subcategories
	has_many :transactions
	
	# validations
	validates :name, presence: true
	validates :category_type, inclusion: { in: %w(I E T)}
end
