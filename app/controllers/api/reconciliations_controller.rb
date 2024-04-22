# frozen_string_literal: true

module Api
  class ReconciliationsController < ApplicationController
    before_action :set_reconciliation, only: [:show, :update]
    before_action :set_account, only: [:index]

    def index
      render json: @account.reconciliations.order(statement_date: :desc)
    end

    def show
      render json: @reconciliation
    end

    def create
      @reconciliation = Reconciliation.new(reconciliation_params)
      if @reconciliation.save
        render json: @reconciliation, status: :created
      else
        render json: @reconciliation.errors, status: :unprocessable_entity
      end
    end

    def update
      if reconciliation_finished?
        transaction_array = params[:transactions]
        reconcile_transactions(transaction_array)
        render json: @reconciliation, status: :ok
      elsif @reconciliation.update(reconciliation_params)
        render json: @reconciliation, status: :ok
      else
        render json: @reconciliation.errors, status: :unprocessable_entity
      end
    end

    private

    def reconciliation_finished?
      params[:reconciled] && params.key?(:transactions)
    end

    def reconcile_transactions(transaction_array)
      ids = transaction_array.pluck(:id)
      transactions = Transaction.find(ids)

      ActiveRecord::Base.transaction do
        transactions.each { |t| t.update(reconciliation: @reconciliation) }
        @reconciliation.update(reconciled: true)
      end
    end

    def set_reconciliation
      @reconciliation = Reconciliation.find(params[:id])
    end

    def set_account
      @account = Account.find(params[:account_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reconciliation_params
      params.require(:reconciliation).permit(:account_id, :statement_date, :statement_balance,
                                             :last_reconciled_date, :last_reconciled_balance, :reconciled)
    end
  end
end
