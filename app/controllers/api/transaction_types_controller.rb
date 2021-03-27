# frozen_string_literal: true

class Api::TransactionTypesController < ApplicationController
  def index
    transaction_types = TransactionType.all.map do |transaction_type|
      {
        id: transaction_type.id,
        code: transaction_type.code,
        name: transaction_type.name
      }
    end

    render json: { transaction_types: transaction_types }
  end
end
