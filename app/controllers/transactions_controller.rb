class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy]
  before_action :get_account, only: [:index, :unreconciled, :ofx]

  # GET /transactions
  # GET /transactions.json
  def index
    # get date range information from parameters, session or default
    get_date_range

    # transactions = @account.transactions.find_by_date(@date_range).reverse_date_order
    transactions = @account.transactions.reverse_date_order
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
    render json: Transaction.unreconciled(@account).reverse_date_order
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
    t.account = @account
    t.duplicate = Transaction.exists?(date: t.date, memo: t.memo, amount: t.amount)
    t.import = !t.duplicate
    allocate_categories(t)
  end

  def allocate_categories(t)
    Pattern.where(account_id: @account.id).each do |p|
      next unless t.memo.downcase.include? p.match_text.downcase
      t.category_id = p.category_id
      t.subcategory_id = p.subcategory_id
      t.notes = p.notes
      break
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def transaction_params
    params.require(:transaction).permit(:transaction_type, :date, :amount, :fitid, :memo, :notes, :account_id, :category_id, :subcategory_id)
  end
end
