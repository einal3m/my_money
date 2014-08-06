require 'rails_helper'

#
#  CategoryType
#  
#  id: int, primary key
#  name: string
#

RSpec.describe CategoryType, :type => :model do
  
# test validations
  it "validates name" do
  	ct = CategoryType.create()
  	expect(ct).not_to be_valid
  end
  
# test relationships
  it "has many categories" do
  	ct = CategoryType.create(name: "Test Category Type")
  	Category.create(category_type: ct, name: "Test Category 1")
  	Category.create(category_type: ct, name: "Test Category 2")
  	
  	expect(ct.categories.length).to eq(2)
  end
  
# test scopes

  it "finds income category type" do
  	CategoryType.create(name: "Income")
  	expect(CategoryType.income.name).to eq("Income")
  end
  
  it "finds expense category type" do
  	CategoryType.create(name: "Expense")
  	expect(CategoryType.expense.name).to eq("Expense")
  end
  
  it "finds transfer category type" do
    CategoryType.create(name: "Transfer")
  	expect(CategoryType.transfer.name).to eq("Transfer")
  end
  
  
end

