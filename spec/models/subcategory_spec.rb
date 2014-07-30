require 'rails_helper'
#
#  Subcategory
#  
#  id: int, primary key
#  name: string
#  category_id: int, foreign key
#  

RSpec.describe Subcategory, :type => :model do

# test validations
  it "validates name is present" do
    c = Category.first
  	s = Subcategory.create(category_id: c.id)
  	
  	expect(s).not_to be_valid
  end
  
  it "validates category is present" do
  	s = Subcategory.create(name: "Test Subcategory")
  
	expect(s).not_to be_valid
  end

# test relationships
  it "belongs to category" do
    c = Category.first
  	s = Subcategory.create(name: "Test Subcategory", category_id: c.id)
  	
  	expect(s.category).to eq(c)
  end
  
  it "has many transactions" do
    c = Category.first
  	s = Subcategory.create(name: "Test Subcategory", category: c)
    a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	Transaction.create(account: a, date: "2014-05-01", amount: 200, category: c, subcategory_id: s.id)
	Transaction.create(account: a, date: "2014-05-02", amount: 100, category: c, subcategory_id: s.id)
  
  	expect(s.transactions.length).to eq(2)
  end
  
  it "has many patterns" do
      a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
      c = Category.first
      s = Subcategory.create(name: "Test Subcategory", category: c)

	  Pattern.create(account: a, category: c, subcategory_id: s.id, match_text: "Test Text1")
	  Pattern.create(account: a, category: c, subcategory_id: s.id, match_text: "Test Text2")
  
  	expect(s.patterns.length).to eq(2)
  end
end
