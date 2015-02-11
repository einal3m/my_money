class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :date, :amount, :memo, :notes, :category_id, :subcategory_id, :balance, :reconciliation_id

    def amount
    	(object.amount*100).to_i
    end

end