class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy]

  # GET /transactions
  # GET /transactions.json
  def index

    # get date range information from parameters, session or default
    get_date_range

    # get selected account information
    get_account

    # if no account has been selected, return empty variables...
    if @account.nil? then
      @transactions = []
      @current_balance = nil
    else
      #... otherwise, find transactions and current balance for selected account
    	@transactions = @account.transactions.find_by_date(@date_range).reverse_date_order
    	@current_balance = @account.starting_balance + @account.transactions.sum(:amount)
    end
  end

  # GET /transactions/1
  # GET /transactions/1.json
  def show
    redirect_to transactions_url
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new
    
    load_form_data
    @transaction.account_id = session[:account_id]
  end

  # GET /transactions/1/edit
  def edit
    load_form_data
    
    # remember where we came from
    session[:last_transaction_page] = request.env['HTTP_REFERER'] || transactions_url
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
    @transaction = Transaction.new(transaction_params)

    respond_to do |format|
      if @transaction.save
        format.html { redirect_to transactions_url, notice: 'Transaction was successfully created.' }
        format.json { render :show, status: :created, location: @transaction }
      else
        load_form_data
        format.html { render :new }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /transactions/1
  # PATCH/PUT /transactions/1.json
  def update
    respond_to do |format|
      if @transaction.update(transaction_params)
        format.html { redirect_to session[:last_transaction_page], notice: 'Transaction was successfully updated.' }
        format.json { render :show, status: :ok, location: @transaction }
      else
        load_form_data
        format.html { render :edit }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /transactions/1
  # DELETE /transactions/1.json
  def destroy
    @transaction.destroy
    respond_to do |format|
      format.html { redirect_to transactions_url, notice: 'Transaction was successfully destroyed.' }
      format.json { head :no_content }
    end
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
