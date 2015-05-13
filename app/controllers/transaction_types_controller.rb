class TransactionTypesController < ApplicationController
  def index
    render json: TransactionType.all
  end
end
