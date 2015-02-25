class AccountsController < ApplicationController
  before_action :set_account, only: [:edit, :update, :destroy, :last_reconciliation]

  # GET /accounts
  # GET /accounts.json
  respond_to :json

  def my_money
  end

  def index
    accounts = Account.all
    render json: accounts
  end

  # POST /accounts
  # POST /accounts.json
  def create
    account = Account.new(account_params)
    if account.save
      render json: account, status: :created
    else
      render json: account.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /accounts/1
  # PATCH/PUT /accounts/1.json
  def update
    if @account.update(account_params)
      render json: @account, status: :ok
    else
      render json: @account.errors, status: :unprocessable_entity
    end
  end

  # DELETE /accounts/1
  # DELETE /accounts/1.json
  def destroy
    @account.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_account
    @account = Account.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def account_params
    params.require(:account).permit(:name, :bank, :starting_balance, :starting_date)
  end
end
