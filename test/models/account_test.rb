require 'test_helper'

#
#  Account
#  
#  id: int, primary key
#  name: string
#  bank: string
#  starting_balance: decimal
#  

class AccountTest < ActiveSupport::TestCase
  
# test validations

  def test_validate_name_exists
  	a = Account.new(bank: "Test Bank", starting_balance: 50)
  	assert_not a.save, "Saved account without name"
  end
  
  def test_validate_starting_balance_exists
  	a = Account.new(name: "Test Account", bank: "Test Bank")
  	assert_not a.save, "Saved account without starting_balance"
  end
  
  def test_validate_starting_balance_numericality
  	a = Account.new(name: "Test Account", bank: "Test Bank", starting_balance: "test")
  	assert_not a.save, "Saved account with starting_balance not a number"
  end

  def test_validate_bank_optional
  	a = Account.new(name: "Test Account", starting_balance: 9.99)
  	assert a.save, "Saved account without bank"
  end

# test relationships

  def test_account_has_many_transactions
  	assert accounts(:one).transactions.length>0, "Account 1 has no transactions"
  end
  
  def test_account_has_many_patterns
  	assert accounts(:one).patterns.length>0, "Account 1 has no patterns"
  end
  
# test properties

  def test_account_id
  	assert_equal accounts(:one).id, 1, "Account id does not equal 1"
  end
  
  def test_account_name
  	assert_equal accounts(:one).name, "Account1", "Account name does not equal Account1"
  end
  
  def test_account_bank
  	assert_equal accounts(:one).bank, "Bank1", "Account name does not equal Bank1"
  end
  
  def test_account_starting_balance
  	assert_equal accounts(:one).starting_balance, 9.99, "Account balance does not equal 99"
  end

end
