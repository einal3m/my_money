json.array!(@transactions) do |transaction|
  json.extract! transaction, :id, :transaction_type, :date, :amount, :fitid, :memo, :category_id, :subcategory_id
  json.url transaction_url(transaction, format: :json)
end
