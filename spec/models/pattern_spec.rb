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

# test data
  before(:all) do
    @a = Account.create(name: "Test Account", starting_balance: 0)
  	@ct = CategoryType.create(name: "Test")
  	@c = Category.create(name: "Test Category", category_type: @ct)
  	@s = Subcategory.create(name: "Test Subcategory", category: @c)
  end

# test validations

  it "validates account present" do
  	p = Pattern.create(match_text: "Test Text", category: @c, subcategory: @s)
  	
  	expect(p).not_to be_valid
  end
  
  it "validates category present" do
  	p = Pattern.create(account: @a, match_text: "Test Text")
  	
  	expect(p).not_to be_valid
  end
    
  it "validates match_text present" do
	p = Pattern.create(account: @a, category: @c)
	
	expect(p).not_to be_valid  
  end
  
# test relationships

  it "belongs to account" do
	p = Pattern.create(account_id: @a.id, category: @c)
	
	expect(p.account).to eq(@a)  
  end
  
  it "belongs to category" do
	p = Pattern.create(account: @a, category_id: @c.id)
	
	expect(p.category).to eq(@c)  
  end
  
  it "belongs to subcategory" do
	p = Pattern.create(account: @a, category: @c, subcategory_id: @s.id)
	
	expect(p.subcategory).to eq(@s)
  end
end
