# frozen_string_literal: true

class BudgetSerializer < ActiveModel::Serializer
  attributes :description, :day_of_month, :amount
end
