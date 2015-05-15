class AccountSerializer < ActiveModel::Serializer
  attributes :id, :account_type_id, :name, :bank, :ticker, :starting_balance, :starting_date, :current_balance
end
