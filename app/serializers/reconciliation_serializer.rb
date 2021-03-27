# frozen_string_literal: true

class ReconciliationSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :statement_date, :statement_balance, :reconciled
end
