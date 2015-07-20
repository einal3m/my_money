require 'creators/bank_statement_creator'

class BankStatementsController < ApplicationController
  def index
  end

  def destroy
  end

  def create
    creator = BankStatementCreator.new bank_statement_params, transaction_params
    @bank_statement = creator.execute
    render json: @bank_statement, status: :created
  end

  private

  def bank_statement_params
    params.require(:bank_statement).permit(:account_id, :date, :file_name, :transactions)
  end

  def transaction_params
    params[:transactions].map do |transaction_attrs|
      transaction_attrs.permit(:account_id, :date, :memo, :notes, :amount, :category_id, :subcategory_id)
    end
  end
end
