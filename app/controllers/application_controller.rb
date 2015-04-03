require 'lib/date_range'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # get_account
  #
  # sets @accounts for select boxes
  # sets @account for currently selected account (nil if none yet selected)
  # sets :account_id in the session as a default for future searches
  def get_account
    # list of all accounts for select boxes
    @accounts = Account.all

    # get account id from either the parameters or the session
    account_id = params.fetch(:account_id, session[:account_id])

    if account_id.nil?
      @account = nil
    else
      session[:account_id] = account_id
      @account = Account.find(account_id.to_i)
    end
  end
end
