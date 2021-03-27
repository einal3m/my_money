# frozen_string_literal: true

class AccountSerializer < ActiveModel::Serializer
  attributes :id, :account_type, :name, :bank, :ticker, :starting_balance, :starting_date, :current_balance,
             :limit, :term, :interest_rate
end
