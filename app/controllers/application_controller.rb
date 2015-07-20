require 'lib/date_range'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def account
    @account ||=  params.key?(:account_id) ? Account.find(params[:account_id].to_i) : nil
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    render json: { message: exception.message }, status: :unprocessable_entity
  end
end
