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
      
      #loop through transaction and see if they already exist
      
  end
  
  # saves the selected transactions to the database
  def save
  	   
  	   redirect_to transactions_url, notice: " transactions imported."
  end

end
