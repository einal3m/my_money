json.array!(@reconciliations) do |reconciliation|
  json.extract! reconciliation, :id, :account_id, :statement_date, :statement_balance, :reconciled
  json.url reconciliation_url(reconciliation, format: :json)
end
