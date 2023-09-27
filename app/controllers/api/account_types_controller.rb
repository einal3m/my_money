# frozen_string_literal: true

module Api
  class AccountTypesController < ApplicationController
    def index
      account_types = AccountType.all.map do |account_type|
        {
          id: account_type.id,
          code: account_type.code,
          name: account_type.name
        }
      end

      render json: { account_types: }
    end
  end
end
