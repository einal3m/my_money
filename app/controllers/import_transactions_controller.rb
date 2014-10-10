class ImportTransactionsController < ApplicationController

	attr_accessor :transactions
	
  # show the file chooser form
  def file_chooser
    @accounts = Account.all

    # if account id is set in the session, set account
    @account = nil
    if session.has_key?(:account_id) then @account = Account.find(session[:account_id]) end

  end

  # read the transaction information from the file and display
  def import
  	  @account = Account.find(params[:account])
      @transactions = parseOFX(params[:money_file])
      @categories = Category.all
      @subcategories = [];

      #add the account id to the session
      session[:account_id] = @account.id
      
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
            
  end

private

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
