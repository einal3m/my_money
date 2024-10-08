# frozen_string_literal: true

require_relative '../../models/destroyers/account_destroyer'

module Api
  class AccountsController < ApplicationController
    def my_money; end

    def index
      render json: Account.all
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

    def deactivate
      if account.update(deleted_at: Date.current)
        head :no_content
      else
        render json: account.errors, status: :unprocessable_entity
      end
    end

    def reactivate
      if account.update(deleted_at: nil)
        head :no_content
      else
        render json: account.errors, status: :unprocessable_entity
      end
    end

    def destroy
      destroyer = AccountDestroyer.new account
      destroyer.execute
      head :no_content
    end

    private

    def account
      @account ||= Account.find(params[:id])
    end

    def account_params
      params.require(:account).permit(
        :account_type, :name, :bank, :starting_balance, :starting_date, :ticker, :limit, :term, :interest_rate
      )
    end
  end
end
