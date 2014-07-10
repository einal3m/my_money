class ImportTransactionsController < ApplicationController

	attr_accessor :transactions
	
  # show the file chooser form
  def file_chooser
      @accounts = Account.all
	  @account = nil
  end

  # read the transaction information from the file and display
  def import
  	  @account = Account.find(params[:account])
  	  @accounts = Account.all
      @transactions = DataFile.parseOFX(params[:money_file])
      @categories = Category.all
      @subcategories = [];
      
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
      	 	if t.memo.include? p.match_text then
      	 	  t.category_id = p.category_id
      	 	  t.subcategory_id = p.subcategory_id
      	 	  break
      	 	end
      	 end  
      end
            
  end
  
  # saves the selected transactions to the database
  def save
  	   
  	   redirect_to transactions_url, notice: " transactions imported."
  end

end
