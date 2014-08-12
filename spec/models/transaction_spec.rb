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

  it "has a valid factory" do
    t = FactoryGirl.create(:transaction)

    expect(t).to be_valid
    expect(t).to be_a(Transaction)
  end

  describe "validations" do

    it "is invalid without a date" do
    	expect(FactoryGirl.build(:transaction, date: nil)).not_to be_valid
    end
    
    it "is invalid without an account" do
    	expect(FactoryGirl.build(:transaction, account: nil)).not_to be_valid
    end
    
    it "is invalid without an amount" do
    	expect(FactoryGirl.build(:transaction, amount: nil)).not_to be_valid
    end
    
    it "is invalid when amount is not a number" do
    	expect(FactoryGirl.build(:transaction, amount: "Amount")).not_to be_valid
    end
  end

  describe "relationships" do

    it "belongs to account" do
      a = FactoryGirl.create(:account)
      expect(FactoryGirl.create(:transaction, account: a).account).to eq(a)
    end
    
    it "belongs to category" do
      c = FactoryGirl.create(:category)
  	  expect(FactoryGirl.create(:transaction, category: c).category).to eq(c)
    end
      
    it "belongs to subcategory" do
      s = FactoryGirl.create(:subcategory)
    	expect(FactoryGirl.create(:transaction, subcategory: s).subcategory).to eq(s)
    end
    
    it "belongs to reconciliation" do
      r = FactoryGirl.create(:reconciliation)
      expect(FactoryGirl.create(:transaction, reconciliation: r).reconciliation).to eq(r)
    end

  end

  describe "scopes" do

    it "finds unreconciled transactions" do
      r = FactoryGirl.create(:reconciliation)
      FactoryGirl.create(:transaction)
      FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)
      FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)

      expect(Transaction.unreconciled(r).length).to eq(2)

    end
  end

  describe "initialize" do

    it "sets add to reconciliation to false" do
      expect(FactoryGirl.create(:transaction).add_to_reconciliation).to eq(false)
    end
    
  end

end
