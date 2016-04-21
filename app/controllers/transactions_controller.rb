class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy]

  def index
    render json: description ? transactions_by_date_and_description : transactions_by_date
  end

  def create
    if params.key?(:_json)
      create_many
    else
      create_one
    end
  end

  def create_one
    transaction = Transaction.new(transaction_params)

    if transaction.save
      render json: transaction, status: :created
    else
      render json: transaction.errors, status: :unprocessable_entity
    end
  end

  def create_many
    transactions = []
    params[:_json].each do |txn_params|
      transaction = Transaction.new(
        txn_params.permit(:transaction_type, :date, :amount, :fitid, :memo, :notes, :account_id, :category_id, :subcategory_id)
      )
      transaction.save
      transactions << transaction
    end
    render json: transactions
  end

  def update
    if @transaction.update(transaction_params)
      render json: @transaction, status: :ok
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @transaction.reconciliation
      render json: { message: 'Cannot delete a transaction which has been reconciled' }, status: :unprocessable_entity
    else
      @transaction.destroy
      head :no_content
    end
  end

  def unreconciled
    render json: Transaction.unreconciled(account).reverse_date_order
  end

  def import
    ofx_parser = parser(params[:data_file])
    @transactions = ofx_parser.transactions

    @transactions.each do |t|
      build_transaction(t)
    end
    render json: @transactions
  end

  def parser(data_file)
    data_file.original_filename.end_with?('ofx') ? Lib::OfxParser.new(data_file) : Lib::CsvParser.new(data_file)
  end

  private

  def from_date
    @from_date ||= params[:from_date]
  end

  def to_date
    @to_date ||= params[:to_date]
  end

  def description
    @description ||= params[:description]
  end

  def transactions_by_date
    account.transactions.find_by_dates(from_date, to_date).reverse_date_order
  end

  def transactions_by_date_and_description
    account.transactions.find_by_dates(from_date, to_date).find_by_description(description).reverse_date_order
  end

  def build_transaction(t)
    t.account = account
    t.duplicate = Transaction.exists?(account: account, date: t.date, memo: t.memo, amount: t.amount)
    t.import = !t.duplicate
    apply_patterns(t)
  end

  def apply_patterns(transaction)
    Pattern.where(account_id: account.id).each do |pattern|
      next unless transaction.memo.downcase.include? pattern.match_text.downcase
      allocate_transaction(transaction, pattern)
      break
    end
  end

  def allocate_transaction(transaction, pattern)
    transaction.category_id = pattern.category_id
    transaction.subcategory_id = pattern.subcategory_id
    transaction.notes = pattern.notes
  end

  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  def transaction_params
    params.require(:transaction).permit(
      :transaction_type, :date, :amount, :fitid, :memo,
      :notes, :account_id, :category_id, :subcategory_id, :quantity, :unit_price
    )
  end
end
