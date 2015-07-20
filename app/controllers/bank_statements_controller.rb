class BankStatementsController < ApplicationController
  def index
  end

  def destroy
  end

  def create
    bank_statement = BankStatement.new(bank_statement_params)
    bank_statement.date = Date.today
    bank_statement.transactions = create_transactions
    bank_statement.transaction_count = bank_statement.transactions.length
    if bank_statement.save
      render json: bank_statement, status: :created
    else
      render json: { message: 'Validation error', errors: bank_statement.errors }, status: :unprocessable_entity
    end
  end

  private

  def create_transactions
    transactions_param.map do |transaction_attrs|
      Transaction.new transaction_params(transaction_attrs)
    end
  end

  def bank_statement_params
    params.require(:bank_statement).permit(:account_id, :date, :file_name, :transactions)
  end

  def transactions_param
    params[:transactions]
  end

  def transaction_params(attrs)
    attrs.permit(
      :transaction_type_id, :date, :amount, :fitid, :memo, :notes, :account_id, :category_id, :subcategory_id
    )
  end
end
