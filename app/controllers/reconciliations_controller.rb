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
    # finished reconciliation?
    if (params[:reconciled] && params.has_key?(:transactions))
      # get transaction data from params
      transaction_array = params[:transactions]

      # extract ids from array which have been selected
      ids = transaction_array.map {|t| t[:id]}

      # get transactions from database
      transactions = Transaction.find(ids)

      # update database
      ActiveRecord::Base.transaction do
        transactions.each { |t| t.update(reconciliation: @reconciliation) }

        # set reconciliation finished
        @reconciliation.update(reconciled: true)
      end
      render json: @reconciliation, status: :ok
    else
      if @reconciliation.update(params[:reconciliation])
        render json: @reconciliation, status: :ok
      else
        render json: @reconciliation.errors, status: :unprocessable_entity
      end
    end

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
      params.require(:reconciliation).permit(:account_id, :statement_date, :statement_balance, :last_reconciled_date, :last_reconciled_balance, :reconciled, :transactions)
    end
end
