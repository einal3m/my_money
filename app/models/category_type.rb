class CategoryType < ActiveRecord::Base
	has_many :categories
	
	scope :income, -> { find_by(name: "Income") }
	scope :expense, -> { find_by(name: "Expense") }
	scope :transfer, -> { find_by(name: "Transfer") }
	
end
