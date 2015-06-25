class AccountTypesController < ApplicationController
  def index
    render json: AccountType.all, each_serializer: AccountTypeSerializer
  end
end
