require 'rails_helper'

#
#  Account
#  
#  id: int, primary key
#  name: string
#  bank: string
#  starting_balance: decimal
#  


RSpec.describe Account, :type => :model do


  it "has a valid factory" do
    a = FactoryGirl.create(:account)

    expect(a).to be_valid
    expect(a).to be_a(Account)
  end

  describe "validations" do

    it "is invalid without a name" do
  	  expect(FactoryGirl.build(:account, name: nil)).not_to be_valid
    end
    
    it "is invalid without a starting balance" do
  	  expect(FactoryGirl.build(:account, starting_balance: nil)).not_to be_valid
    end
    
    it "is invalid without a starting date" do
      expect(FactoryGirl.build(:account, starting_date: nil)).not_to be_valid
    end
    
    it "is invalid if starting balance is not a number" do
  	  expect(FactoryGirl.build(:account, starting_balance: "a")).not_to be_valid
    end
    
    it "is valid without a bank" do
  	  expect(FactoryGirl.build(:account, bank: nil)).to be_valid
    end
  end

  describe "relationships" do
    it "has many transactions" do
      a = FactoryGirl.create(:account)
  	  Transaction.create(account: a, date: "2014-05-01", amount: 200)
  	  Transaction.create(account: a, date: "2014-05-02", amount: 100)
  	  
  	  expect(a.transactions.length).to eq(2)
    end
  
    it "has many patterns" do
    	  ct = CategoryType.create(name: "Test category type")
    	  c = Category.create(name: "Test Category", category_type: ct)
      a = FactoryGirl.create(:account)
  	  Pattern.create(account: a, category: c, match_text: "Test Text1")
  	  Pattern.create(account: a, category: c, match_text: "Test Text2")
  	  
  	  expect(a.patterns.length).to eq(2)
    end
  end
  
  describe "properties" do

    it "sets a name" do
      a = FactoryGirl.create(:account, name: "Test Name1")
      expect(a.name).to eq("Test Name1")
    end
    
    it "sets a bank" do
      a = FactoryGirl.create(:account, bank: "Test Bank1")
  	  expect(a.bank).to eq("Test Bank1")
    end
    
    it "sets a starting balance" do
      a = FactoryGirl.create(:account, starting_balance: 50.01)
  	  expect(a.starting_balance).to eq(50.01)
    end

    it "sets a starting balance" do
      a = FactoryGirl.create(:account, starting_date: "2014-02-02")
      expect(a.starting_date).to eq(Date.parse("2014-02-02"))
    end

  end  
end
