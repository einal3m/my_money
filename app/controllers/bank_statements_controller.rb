require 'creators/bank_statement_creator'
require 'destroyers/bank_statement_destroyer'

class BankStatementsController < ApplicationController
  def index
    render json: account.bank_statements
  end

  def destroy
    destroyer = BankStatementDestroyer.new bank_statement
    destroyer.execute

    head :no_content
  end

  def create
    creator = BankStatementCreator.new bank_statement_create_params, transaction_create_params
    @bank_statement = creator.execute
    render json: @bank_statement, status: :created
  end

  private

  def bank_statement
    @bank_statement ||= BankStatement.find(params[:id])
  end

  def bank_statement_create_params
    params.require(:bank_statement).permit(:account_id, :date, :file_name, :transactions)
  end

  def transaction_create_params
    params[:transactions].map do |transaction_attrs|
      transaction_attrs.permit(:account_id, :date, :memo, :notes, :amount, :category_id, :subcategory_id)
    end
  end
end
