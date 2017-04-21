require_relative 'model_serializer'

class AccountSerializer
  include ModelSerializer

  attributes :id, :name, :bank, :starting_balance, :starting_date, :ticker, :account_type,
             :limit, :term, :interest_rate
end
