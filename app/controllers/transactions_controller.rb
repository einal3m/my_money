class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy]
  before_action :get_account, only: [:index]

  # GET /transactions
  # GET /transactions.json
  def index
    # get date range information from parameters, session or default
    get_date_range

    transactions = @account.transactions.find_by_date(@date_range).reverse_date_order
    render json: transactions
  end

  def load_form_data
  
    # lists for drop-downs
    @accounts = Account.all
	@subcategories = {}
	@categories = Category.all
	
	# hash for category drop down
	@category_options = {prompt: true}
	if !@transaction.category.nil? then
		@category_options[:selected] = @transaction.category_id.to_i
		@subcategories = @transaction.category.subcategories
	end

	# hash for sub-category drop down
	@subcategory_options = {prompt: true}
	if !@transaction.subcategory.nil? then
		@subcategory_options[:selected] = @transaction.subcategory_id.to_i
	end

  end

  # POST /transactions
  # POST /transactions.json
  def create
    transaction = Transaction.new(transaction_params)

    if transaction.save
      render json: transaction, status: :created
    else
      render json: transaction.errors, status: :unprocessable_entity
    end
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

  def import
 
 	  account = params["account"]["id"].to_i
 	
  	params[:import_transactions].each do |transaction|

      if transaction[:import] == "1" then
        transaction.delete("import")
        transaction["date"] = transaction["date"].to_date
        transaction["amount"] = transaction["amount"].to_f
        transaction["account_id"] = account
  
        Transaction.create(transaction.permit(:transaction_type, :date, :amount, :fitid, :memo, :notes, :account_id, :category_id, :subcategory_id))
      end
  	end
   
    redirect_to transactions_url, notice: 'Transactions imported'
  end
  
  # GET transactions/unreconciled?account_id=?
  def unreconciled
    account = Account.find(params[:account_id])
    render json: Transaction.unreconciled(account).reverse_date_order
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def transaction_params
      params.require(:transaction).permit(:transaction_type, :date, :amount, :fitid, :memo, :notes, :account_id, :category_id, :subcategory_id)
    end
end
