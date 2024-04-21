# frozen_string_literal: true

require_relative '../models/lib/date_range'
require_relative '../models/exceptions/my_money_error'

class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token
  
  def account
    @account ||= params.key?(:account_id) ? Account.find(params[:account_id].to_i) : nil
  end

  rescue_from ActiveRecord::RecordInvalid do |exception|
    render json: { message: exception.message }, status: :unprocessable_entity
  end

  rescue_from MyMoneyError do |exception|
    render json: { message: exception.message }, status: :unprocessable_entity
  end
end
