class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :transaction_type, :date, :amount, :memo, :notes,
             :category_id, :subcategory_id, :balance, :reconciliation_id, :quantity,
             :unit_price
end
