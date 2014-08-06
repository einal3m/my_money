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

# test validations

  it "validates account name exists" do
    a = Account.create(bank: "Test Bank", starting_balance: 50)
	expect(a).not_to be_valid
  end
  
  it "validates starting balance exists" do
    a = Account.create(name: "Test Name", bank: "Test Bank")
	expect(a).not_to be_valid
  end
  
  it "validates starting balance is a number" do
    a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: "blah")
	expect(a).not_to be_valid
  end
  
  it "validates bank is optional" do
    a = Account.create(name: "Test Name", starting_balance: 50)
	expect(a).to be_valid
  end
    
# test relationships
  it "has many transactions" do
      a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	  Transaction.create(account: a, date: "2014-05-01", amount: 200)
	  Transaction.create(account: a, date: "2014-05-02", amount: 100)
	  
	  expect(a.transactions.length).to eq(2)
  end
  
  it "has many patterns" do
  	  ct = CategoryType.create(name: "Test category type")
  	  c = Category.create(name: "Test Category", category_type: ct)
      a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	  Pattern.create(account: a, category: c, match_text: "Test Text1")
	  Pattern.create(account: a, category: c, match_text: "Test Text2")
	  
	  expect(a.patterns.length).to eq(2)
  end
  
# test properties

  it "has a name" do
      a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
      expect(a.name).to eq("Test Name")
  end
  
  it "has a bank" do
      a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	  expect(a.bank).to eq("Test Bank")
  end
  
  it "has a starting balance" do
      a = Account.create(name: "Test Name", bank: "Test Bank", starting_balance: 50)
	  expect(a.starting_balance).to eq(50)
  end
  
end
