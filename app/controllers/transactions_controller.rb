class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy]

  # GET /transactions
  # GET /transactions.json
  def index
    from_date = params[:from_date]
    to_date = params[:to_date]

    transactions = account.transactions.find_by_dates(from_date, to_date).reverse_date_order
    render json: transactions
  end

  # POST /transactions
  # POST /transactions.json
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

  # PATCH/PUT /transactions/1
  # PATCH/PUT /transactions/1.json
  def update
    if @transaction.update(transaction_params)
      render json: @transaction, status: :ok
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transactions/1
  # DELETE /transactions/1.json
  def destroy
    @transaction.destroy
    head :no_content
  end

  # GET transactions/unreconciled?account_id=?
  def unreconciled
    render json: Transaction.unreconciled(account).reverse_date_order
  end

  def ofx
    ofx_parser = Lib::OfxParser.new(params[:data_file])
    @transactions = ofx_parser.transactions

    @transactions.each do |t|
      build_transaction(t)
    end
    render json: @transactions
  end

  private

  def build_transaction(t)
    t.account = account
    t.duplicate = Transaction.exists?(date: t.date, memo: t.memo, amount: t.amount)
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

  # Use callbacks to share common setup or constraints between actions.
  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def transaction_params
    params.require(:transaction).permit(
      :transaction_type, :date, :amount, :fitid, :memo,
      :notes, :account_id, :category_id, :subcategory_id, :quantity, :unit_price
    )
  end
end
