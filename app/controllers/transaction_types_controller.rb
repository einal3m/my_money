class TransactionTypesController < ApplicationController
  def index
    render json: TransactionType.all, each_serializer: TransactionTypeSerializer
  end
end
