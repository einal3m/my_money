require 'lib/date_range'
require 'exceptions/my_money_error'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def account
    @account ||=  params.key?(:account_id) ? Account.find(params[:account_id].to_i) : nil
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    render json: { message: exception.message }, status: :unprocessable_entity
  end

  rescue_from MyMoneyError do |exception|
    render json: { message: exception.message }, status: :unprocessable_entity
  end
end
