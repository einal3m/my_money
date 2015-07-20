class BankStatementCreator
  CREATE_BANK_STATEMENT_VALID_PARAMS = [:account_id, :file_name]
  CREATE_TRANSACTIONS_VALID_PARAMS = [:account_id, :date, :amount, :memo, :notes, :category_id, :subcategory_id]

  def initialize(bank_statement_params, transaction_params)
    @bank_statement_params = bank_statement_params
    @transaction_params = transaction_params
  end

  def execute
    @bank_statement = build_bank_statement
    @bank_statement.transactions = build_transactions
    @bank_statement.transaction_count = @bank_statement.transactions.length
    @bank_statement.save!
    @bank_statement
  end

  private

  def build_bank_statement
    bank_statement_attrs = @bank_statement_params.symbolize_keys.assert_valid_keys(CREATE_BANK_STATEMENT_VALID_PARAMS)
    BankStatement.new bank_statement_attrs.merge(date: Date.today)
  end

  def build_transactions
    @transaction_params.map do |transaction_attrs|
      Transaction.new transaction_attrs.symbolize_keys.assert_valid_keys(CREATE_TRANSACTIONS_VALID_PARAMS)
    end
  end
end
