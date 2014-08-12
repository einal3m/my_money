require 'rails_helper'

#
# Reconciliation
#
# id, int primary key
# account_id, int foreign key
# statement_date, date
# statement_balance, decimal
# reconciled, boolean
#

RSpec.describe Reconciliation, :type => :model do

  it "has a valid factory" do
    r = FactoryGirl.create(:reconciliation)

    expect(r).to be_valid
    expect(r).to be_a(Reconciliation)
  end

  describe "validations" do

    it "is invalid without an account" do
    	expect(FactoryGirl.build(:reconciliation, account: nil)).not_to be_valid  
    end
    
    it "is invalid without a statement date" do
    	expect(FactoryGirl.build(:reconciliation, statement_date: nil)).not_to be_valid
    end
    
    it "is invalid without a statement balance" do
  	  expect(FactoryGirl.build(:reconciliation, statement_balance: nil)).not_to be_valid
    end
  end

  describe "relationships" do

    it "belongs to account" do
      a = FactoryGirl.create(:account)
    	expect(FactoryGirl.create(:reconciliation, account: a).account).to eq(a)
    end

    it "has many transactions" do
      r = FactoryGirl.create(:reconciliation)
      FactoryGirl.create(:transaction, reconciliation: r)
      FactoryGirl.create(:transaction, reconciliation: r)

      expect(r.transactions.length).to eq(2)
    end

  end  
  
  describe "initialize" do
    it "sets reconciled to false by default" do
  	  expect(FactoryGirl.create(:reconciliation).reconciled).to eq(false)
    end
  end
end
