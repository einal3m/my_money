require 'rails_helper'
#
#  Transaction
#  
#  id: int, primary key
#  date: date
#  fitid: string
#  memo: string
#  amount: decimal
#  account_id: int, foreign key
#  category_id: int, foreign key, ('I', 'E' or 'T')
#  subcategory_id: int foreign key
#  
RSpec.describe Transaction, :type => :model do

# test validations

  it "validates date presence" do
    a = Account.create(name: "Test Account", starting_balance: 0)
  	t = Transaction.create(account: a, amount: 10)
  	
  	expect(t).not_to be_valid
  end
  
  it "validates account presence" do
  	t = Transaction.create(date: "2014-07-30", amount: 10)
  
  	expect(t).not_to be_valid
  end
  
  it "validates amount presence" do
    a = Account.create(name: "Test Account", starting_balance: 0)
  	t = Transaction.create(date: "2014-07-30", account: a)
  	
  	expect(t).not_to be_valid
  end
  
  it "validates amount is a number" do
    a = Account.create(name: "Test Account", starting_balance: 0)
  	t = Transaction.create(date: "2014-07-30", account: a, amount: "Amount")
  	
  	expect(t).not_to be_valid
  end
  
# test relationships

  it "belongs to account" do
    a = Account.create(name: "Test Account", starting_balance: 0)
  	t = Transaction.create(account_id: a.id, amount: 10)
  
    expect(t.account).to eq(a)
  end
  
  it "belongs to category" do
    a = Account.create(name: "Test Account", starting_balance: 0)
    c = Category.first
  	t = Transaction.create(account_id: a.id, amount: 10, category_id: c.id)

	expect(t.category).to eq(c)
  end
    
  it "belongs to subcategory" do
    a = Account.create(name: "Test Account", starting_balance: 0)
    s = Subcategory.first
  	t = Transaction.create(account_id: a.id, amount: 10, category: s.category, subcategory_id: s.id)
  	
  	expect(t.subcategory).to eq(s)
  end
  
end
