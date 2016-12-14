class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy, :matching]

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
        txn_params.permit(
          :transaction_type, :date, :amount, :fitid, :memo, :notes,
          :account_id, :category_id, :subcategory_id, :matching_transaction_id
        )
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

  def ofx
    import
  end

  def import
    transactions = Lib::TransactionImporter.new(account, params[:data_file]).execute
    render json: transactions
  end

  def matching
    txns = Transaction.where(amount: -@transaction.amount, date: @transaction.date)
                      .where.not(account: @transaction.account)

    render json: txns
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

  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  def transaction_params
    params.require(:transaction).permit(
      :transaction_type, :date, :amount, :fitid, :memo,
      :notes, :account_id, :category_id, :subcategory_id, :quantity, :unit_price, :matching_transaction_id
    )
  end
end
