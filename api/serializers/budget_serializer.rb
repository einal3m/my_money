require_relative 'model_serializer'

class BudgetSerializer
  include ModelSerializer

  attributes :id, :account_id, :description, :day_of_month, :amount
end
