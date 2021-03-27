# frozen_string_literal: true

require 'exceptions/my_money_error'

class AccountDestroyer
  def initialize(account)
    @account = account
  end

  def execute
    validate_account
    @account.destroy!
  end

  def validate_account
    raise MyMoneyError, 'Cannot delete an account that has transactions' unless @account.transactions.empty?
  end
end
