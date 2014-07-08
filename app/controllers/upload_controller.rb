class UploadController < ApplicationController

  def file_chooser
  end
  
  def upload_file
    @transactions = DataFile.parseOFX(params[:money_file])
    @accounts = Account.all
    
    #render :text => "File has been uploaded successfully"
  end
  
end
