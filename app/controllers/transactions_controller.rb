class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]

  # GET /transactions
  # GET /transactions.json
  def index
p params
    # list of all accounts
    @accounts = Account.all
    
    # currently selected account
    @account_id = params[:account_id]
    
    # if account has not been selected, select first one
    if @account_id.nil? then
	  @account = Account.first
	else
      @account = Account.find(@account_id)
    end

	#@transactions = Transaction.where(account_id: @account.id)
	@transactions = @account.transactions

  end

  # GET /transactions/1
  # GET /transactions/1.json
  def show
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new
    
    form_data

  end

  # GET /transactions/1/edit
  def edit
    form_data
  end
  
  def form_data
  
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
        format.html { redirect_to transactions_url, notice: 'Transaction was successfully updated.' }
        format.json { render :show, status: :ok, location: @transaction }
      else
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
   p "transactions_controller.import"
 
 	account = params["account"]["id"].to_i
 	
  	   params[:import_transactions].each do |transaction|
  	     p transaction
  	     if transaction[:import] == "1" then
  	        transaction.delete("import")
  	        transaction["date"] = transaction["date"].to_date
  	        transaction["amount"] = transaction["amount"].to_f
  	        transaction["account_id"] = account
  	        
  	  
  	        @transaction = transaction
  	     p "saving transaction"
  	     p transaction
  	        Transaction.create(transaction.permit(:transaction_type, :date, :amount, :fitid, :memo, :account_id, :category_id, :subcategory_id))

  	     
  	     end
  	   end
   
   redirect_to transactions_url, notice: 'Transactions imported'
  end
  
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def transaction_params
      params.require(:transaction).permit(:transaction_type, :date, :amount, :fitid, :memo, :account_id, :category_id, :subcategory_id)
    end
end
