class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:edit, :update, :destroy]
  before_action :get_account, only: [:index]

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
      transaction = Transaction.new(txn_params.permit(:transaction_type, :date, :amount, :fitid, :memo, :notes, :account_id, :category_id, :subcategory_id))
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

  def import
    account = params['account']['id'].to_i

    params[:import_transactions].each do |transaction|
      if transaction[:import] == '1'
        transaction.delete('import')
        transaction['date'] = transaction['date'].to_date
        transaction['amount'] = transaction['amount'].to_f
        transaction['account_id'] = account

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

  def ofx
    @account = Account.find(params[:account_id])
    @transactions = parseOFX(params[:data_file])
    #loop through transactions... 
    @transactions.each do |t|
    
       t.account = @account
       t.duplicate = false
       t.import = true
       
       # ... check if they are duplicates
       if Transaction.exists?(date: t.date, memo: t.memo, amount: t.amount) then
        t.duplicate = true
        t.import = false
       end         
       
       # ... check if they match any pattern
       @patterns = Pattern.where(account_id: @account.id);
       @patterns.each do |p|
        if t.memo.downcase.include? p.match_text.downcase then
          t.category_id = p.category_id
          t.subcategory_id = p.subcategory_id
          t.notes = p.notes
          break
        end
       end  
    end
    render json: @transactions
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

  # constants for parsing OFX file

  STMTTRN = "<STMTTRN>"
  END_STMTTRN = "</STMTTRN>"
  TRNTYPE = "<TRNTYPE>"
  DTPOSTED = "<DTPOSTED>"
  TRNAMT = "<TRNAMT>"
  FITID = "<FITID>"
  MEMO = "<MEMO>"

  # parseOFX takes an uploaded OFX file and parses it
  # it returns an array of transactions  
  def parseOFX(uploadedFile)
  
    ofxArray = uploadedFile.read.split(/\r\n/)
  
    txnArray = Array.new
  
    ofxArray.each_with_index do |ofx, i|
  
      # look for the start of the transaction...
      if (ofx == STMTTRN) then
      
        #... then search the entries following for the rest
        txn_i = i + 1
        while (ofxArray[txn_i] != END_STMTTRN) do
        
          if (ofxArray[txn_i][0..8] == TRNTYPE) then
            txnType = ofxArray[txn_i].reverse[0..-10].reverse
          elsif (ofxArray[txn_i][0..9] == DTPOSTED) then
            txnDate = Date.iso8601(ofxArray[txn_i].reverse[0..-11].reverse)
          elsif (ofxArray[txn_i][0..7] == TRNAMT) then
            txnAmount = ofxArray[txn_i].gsub(/\s+/, "").reverse[0..-9].reverse.to_f
            txnAmount = (txnAmount*100).to_i
          elsif (ofxArray[txn_i][0..6] == FITID) then
            txnId = ofxArray[txn_i].reverse[0..-8].reverse
          elsif (ofxArray[txn_i][0..5] == MEMO) then
            txnMemo = ofxArray[txn_i].reverse[0..-7].reverse
          end
          txn_i += 1
        end

        # add all txn info onto the txnArray variable
        txnArray = txnArray.push(ImportedTransaction.new(transaction_type: txnType, date: txnDate, amount: txnAmount, fitid: txnId, memo: txnMemo))
      end
    end

    return txnArray
  end

end
