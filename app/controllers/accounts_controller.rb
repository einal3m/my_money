class AccountsController < ApplicationController
  def my_money
  end

  def index
    accounts = Account.all
    render json: accounts
  end

  def create
    new_account = Account.new(account_params)
    if new_account.save
      render json: new_account, status: :created
    else
      render json: new_account.errors, status: :unprocessable_entity
    end
  end

  def update
    if account.update(account_params)
      render json: account, status: :ok
    else
      render json: account.errors, status: :unprocessable_entity
    end
  end

  def destroy
    account.destroy
    head :no_content
  end

  private

  def account
    @account ||= Account.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:account_type_id, :name, :bank, :starting_balance, :starting_date, :ticker)
  end
end
