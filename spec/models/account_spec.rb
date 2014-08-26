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
      FactoryGirl.create(:transaction, account: a)
      FactoryGirl.create(:transaction, account: a)

  	  expect(a.transactions.length).to eq(2)
    end
  
    it "has many patterns" do
      a = FactoryGirl.create(:account)
      FactoryGirl.create(:pattern, account: a)
      FactoryGirl.create(:pattern, account: a)

  	  expect(a.patterns.length).to eq(2)
    end

    it "has many reconciliations" do
      a = FactoryGirl.create(:account)
      FactoryGirl.create(:reconciliation, account: a)
      FactoryGirl.create(:reconciliation, account: a)

      expect(a.reconciliations.length).to eq(2)
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

    it "sets a starting date" do
      a = FactoryGirl.create(:account, starting_date: "2014-02-02")
      expect(a.starting_date).to eq(Date.parse("2014-02-02"))
    end
  end

  describe "methods" do
    before :each do
      @a = FactoryGirl.create(:account, starting_balance: 10.00, starting_date: "2014-08-01")
    end

    it "calculates current balance when there are no transactions" do
      expect(@a.current_balance).to eq(10.00)
    end

    it "calculates current balance when there are transactions" do
      FactoryGirl.create(:transaction, account: @a, date: "2014-08-4", amount: 20.00)
      FactoryGirl.create(:transaction, account: @a, date: "2014-08-2", amount: 30.00)

      expect(@a.current_balance).to eq(60.00)
    end
  end  
end
