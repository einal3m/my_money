class ReconciliationSerializer < ActiveModel::Serializer
  attributes :id, :statement_date, :statement_balance, :reconciled
end
