require 'rails_helper'

#
#  Pattern
#  
#  id: int, primary key
#  account_id: int, foreign key
#  match_text: string
#  category_id: int, foreign key
#  subcategory_id: int foreign key
#  
RSpec.describe Pattern, :type => :model do

# test validations

  it "validates account present" do
    s = Subcategory.first
  	p = Pattern.create(match_text: "Test Text", category: s.category, subcategory: s)
  	
  	expect(p).not_to be_valid
  end
  
  it "validates category present" do
    a = Account.create(name: "Test Account", starting_balance: 0)
  	p = Pattern.create(account: a, match_text: "Test Text")
  	
  	expect(p).not_to be_valid
  end
    
  it "validates match_text present" do
    a = Account.create(name: "Test Account", starting_balance: 0)
    s = Subcategory.first
	p = Pattern.create(account: a, category: s.category)
	
	expect(p).not_to be_valid  
  end
  
# test relationships

  it "belongs to account" do
    a = Account.create(name: "Test Account", starting_balance: 0)
    s = Subcategory.first
	p = Pattern.create(account_id: a.id, category: s.category)
	
	expect(p.account).to eq(a)  
  end
  
  it "belongs to category" do
    a = Account.create(name: "Test Account", starting_balance: 0)
    s = Subcategory.first
	p = Pattern.create(account: a, category_id: s.category.id)
	
	expect(p.category).to eq(s.category)  
  end
  
  it "belongs to subcategory" do
    a = Account.create(name: "Test Account", starting_balance: 0)
    s = Subcategory.first
	p = Pattern.create(account: a, category: s.category, subcategory_id: s.id)
	
	expect(p.subcategory).to eq(s)
  end
end
