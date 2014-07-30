require 'rails_helper'

#
#  Category
#  
#  id: int, primary key
#  name: string
#  category_type: string ('I', 'E' or 'T')
#  

RSpec.describe Category, :type => :model do
  
# test validations
  it "validates name is present" do
  	c = Category.create(category_type_id: 1)
  	expect(c).not_to be_valid
  end
  
  it "validates category_type_id is present" do
  	c = Category.create(name: "Test Category")
  	expect(c).not_to be_valid
  end
  
  it "validates category_type_id is a number" do
  	c = Category.create(name: "Test Category", category_type_id: "blah")
  	expect(c).not_to be_valid
  end


# test relationships  
  it "has many subcategories" do
  	c = Category.create(name: "Test Category", category_type_id: 1)
  	Subcategory.create(category: c, name: "Test Subcategory1")
  	Subcategory.create(category: c, name: "Test Subcategory2")
  	
  	expect(c.subcategories.length).to eq(2)
  end
  
  it "has many transactions" do
  	c = Category.create(name: "Test Category", category_type_id: 1)
    a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	Transaction.create(account: a, date: "2014-05-01", amount: 200, category: c)
	Transaction.create(account: a, date: "2014-05-02", amount: 100, category: c)

  	expect(c.transactions.length).to eq(2)
  end
  
  it "has many patterns" do
  	c = Category.create(name: "Test Category", category_type_id: 1)
  	a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	Pattern.create(account: a, category: c, match_text: "Test Text1")
	Pattern.create(account: a, category: c, match_text: "Test Text2")

  	expect(c.patterns.length).to eq(2)
  end
  
  it "belongs to category_type" do
  	c = Category.create(name: "Test Category", category_type_id: 1)
  	
  	expect(c.category_type).to be_valid
  end
  
end
