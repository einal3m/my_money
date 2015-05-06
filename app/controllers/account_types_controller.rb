class AccountTypesController < ApplicationController
  def index
    render json: AccountType.all
  end
end
