require 'date_range'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  # get the date range from params, if it does not exist check the session
  # defaults to current month
  def get_date_range
    # check params first, then session
    @date_range_option = DateRangeOption.find(params.fetch(:date_range_option_id, session[:date_range_option_id]) || DateRangeOption.default.id)
    from_date = params.fetch(:from_date, session[:from_date])
    to_date = params.fetch(:to_date, session[:to_date])

    # create the date range object
    @date_range = @date_range_option.klass.constantize.new({from_date: from_date, to_date: to_date})
    @date_range_options = DateRangeOption.all
  	
  	# update session
  	session[:from_date] = @date_range.from_date.to_s
  	session[:to_date] = @date_range.to_date.to_s
    session[:date_range_option_id] = @date_range_option.id

  end

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

    if account_id.nil? then
      @account = nil
    else
      session[:account_id] = account_id
      @account = Account.find(account_id.to_i)
    end
  end

end
