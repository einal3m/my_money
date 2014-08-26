class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :edit, :update, :destroy, :last_reconciliation]

  # GET /accounts
  # GET /accounts.json
  def index
    @accounts = Account.all
    @net_worth = 0.00
    @accounts.each do |account|
p "account " + account.name + " balance: " + account.current_balance.to_s
      @net_worth = @net_worth + account.current_balance
    end
  end

  # GET /accounts/1
  # GET /accounts/1.json
  def show
  end

  # GET /accounts/new
  def new
    @account = Account.new
  end

  # GET /accounts/1/edit
  def edit
  end

  # POST /accounts
  # POST /accounts.json
  def create
    @account = Account.new(account_params)

    respond_to do |format|
      if @account.save
        format.html { redirect_to accounts_url, notice: 'Account was successfully created.' }
        format.json { render :show, status: :created, location: @account }
      else
        format.html { render :new }
        format.json { render json: @account.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /accounts/1
  # PATCH/PUT /accounts/1.json
  def update
    respond_to do |format|
      if @account.update(account_params)
        format.html { redirect_to accounts_url, notice: 'Account was successfully updated.' }
        format.json { render :show, status: :ok, location: @account }
      else
        format.html { render :edit }
        format.json { render json: @account.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accounts/1
  # DELETE /accounts/1.json
  def destroy
    @account.destroy
    respond_to do |format|
      format.html { redirect_to accounts_url, notice: 'Account was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def last_reconciliation

    if @account.reconciliations.length == 0
      @last_date = @account.starting_date
      @last_balance = @account.starting_balance
    else
      @last_date = @account.reconciliations.last.statement_date
      @last_balance = @account.reconciliations.last.statement_balance
    end

    respond_to do |format|
      format.js
    end

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
