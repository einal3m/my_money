class ReconciliationsController < ApplicationController
  before_action :set_reconciliation, only: [:show, :update, :transactions, :reconcile]
  before_action :set_account, only: [:index]

  # GET account/:account_id/reconciliations
  def index
    render json: @account.reconciliations.order(statement_date: :desc)
  end

  # GET account/:account_id/reconciliations/1
  def show
    render json: @reconciliation
  end

  # POST account/:account_id/reconciliations
  def create
    @reconciliation = Reconciliation.new(reconciliation_params)

    if @reconciliation.save
      render json: @reconciliation, status: :created
    else
      render json: @reconciliation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT account/:account_id/reconciliations/1
  def update
    if @reconciliation.update(reconciliation_params)
      render json: @reconciliation, status: :ok
    else
      render json: @reconciliation.errors, status: :unprocessable_entity
    end
  end

  # def transactions
  #   @transactions =  Transaction.unreconciled(@reconciliation).date_order
  # end

  def reconcile

    # get transaction data from params
    transaction_array = params[:transactions]

    # extract ids from array which have been selected
    ids = transaction_array.map { |x| x[:id] if x[:add_to_reconciliation] == "1" }.compact!

    # get transactions from database
    transactions = Transaction.find(ids)

    # update database
    ActiveRecord::Base.transaction do
      transactions.each { |t| t.update(reconciliation: @reconciliation) }

      # set reconciliation finished
      @reconciliation.update(reconciled: true)
    end

    # set current account to session, so that we see the transactions for that account
    session[:account_id] = @reconciliation.account.id
    redirect_to transactions_url
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reconciliation
      @reconciliation = Reconciliation.find(params[:id])
    end

    def set_account
      @account = Account.find(params[:account_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reconciliation_params
      params.require(:reconciliation).permit(:account_id, :statement_date, :statement_balance, :last_reconciled_date, :last_reconciled_balance, :reconciled)
    end
end
