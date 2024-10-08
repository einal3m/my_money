# frozen_string_literal: true

class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :description, :day_of_month, :amount
end
