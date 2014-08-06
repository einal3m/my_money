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

# test data
  before(:all) do
    @a = Account.create(name: "Test Account", starting_balance: 0)
  end

# test validation
  it "validates account present" do
  	r = Reconciliation.create(statement_date: "2014-07-01", statement_balance: 0)
  	
  	expect(r).not_to be_valid  
  end
  
  it "validates date present" do
  	r = Reconciliation.create(account: @a, statement_balance: 0)
  	
  	expect(r).not_to be_valid
  end
  
  it "validates balance present" do
  	r = Reconciliation.create(account: @a, statement_date: "2014-07-01")

	  expect(r).not_to be_valid
  end
    
# test relationships
  it "belongs to account" do
  	r = Reconciliation.create(account_id: @a.id, statement_date: "2014-07-01", statement_balance: 0)
  	
  	expect(r.account).to eq(@a)
  end
  
# test initialise
  it "sets reconciled to false by default" do
  	r = Reconciliation.create(account: @a, statement_date: "2014-07-01", statement_balance: 0)

	  expect(r.reconciled).to eq(false)
  end
    
end
