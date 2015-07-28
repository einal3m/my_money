require 'exceptions/my_money_error'

class BankStatementDestroyer
  def initialize(bank_statement)
    @bank_statement = bank_statement
  end

  def execute
    @bank_statement.transactions.each do |transaction|
      validate_transaction transaction
      transaction.destroy!
    end
    @bank_statement.destroy!
  end

  private

  def validate_transaction(transaction)
    raise MyMoneyError, 'Cannot delete a bank statement with reconciled transactions' if transaction.reconciliation
  end
end
