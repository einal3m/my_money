# frozen_string_literal: true

class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :transaction_type, :date, :amount, :memo, :notes,
             :category_id, :subcategory_id, :balance, :reconciliation_id, :quantity,
             :unit_price, :matching_transaction

  def matching_transaction
    return nil unless object.matching_transaction_id

    matching_transaction = object.matching_transaction
    {
      id: matching_transaction.id,
      account_id: matching_transaction.account_id,
      notes: matching_transaction.notes,
      memo: matching_transaction.memo
    }
  end
end
