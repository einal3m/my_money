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
    @a = FactoryGirl.create(:account)
  	@ct = CategoryType.create(name: "Test")
  	@c = Category.create(name: "Test Category", category_type: @ct)
  	@s = Subcategory.create(name: "Test Subcategory", category: @c)
  end


  it "has a valid factory" do
    p = FactoryGirl.create(:pattern)

    expect(p).to be_valid
    expect(p).to be_a(Pattern)
  end
  

  describe "validations" do

    it "is invalid without an account" do
    	expect(FactoryGirl.build(:pattern, account: nil)).not_to be_valid
    end
    
    it "is invalid without a category" do
    	expect(FactoryGirl.build(:pattern, category: nil)).not_to be_valid
    end
      
    it "is invalid without match text" do
  	  expect(FactoryGirl.build(:pattern, match_text: nil)).not_to be_valid  
    end

  end  

  describe "relationships" do

    it "belongs to account" do
      a = FactoryGirl.create(:account)
    	expect(FactoryGirl.create(:pattern, account: a).account).to eq(a)  
    end
    
    it "belongs to category" do
      c = FactoryGirl.create(:category)
    	expect(FactoryGirl.create(:pattern, category: c).category).to eq(c)  
    end
    
    it "belongs to subcategory" do
      s = FactoryGirl.create(:subcategory)
    	expect(FactoryGirl.create(:pattern, subcategory: s).subcategory).to eq(s)
    end

  end
end
