class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name, :bank, :starting_balance, :starting_date, :current_balance
end
