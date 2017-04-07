require_relative 'account_type'

class Account < Sequel::Model
  plugin :validation_helpers

  def validate
    super
    validates_presence [:name, :account_type]
    validate_savings_account if account_type == AccountType::SAVINGS
    validate_share_account if account_type == AccountType::SHARE
    validate_loan_account if account_type == AccountType::LOAN
  end

  def validate_savings_account
    validates_presence [:starting_balance, :starting_date]
    validates_integer :starting_balance unless starting_balance.nil?
  end

  def validate_share_account
    validates_presence [:ticker]
  end

  def validate_loan_account
    validates_presence [:starting_date, :limit, :term, :interest_rate]
    validates_integer :term unless term.nil?
    validates_integer :limit unless limit.nil?
    validates_numeric :interest_rate unless interest_rate.nil?
  end
end
