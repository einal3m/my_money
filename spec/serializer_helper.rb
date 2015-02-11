def serialize_account(account)
  attrs = JSON.parse(account.to_json)
  attrs["current_balance"] = account.current_balance.as_json
  attrs.extract!("id", "name", "bank", "starting_balance", "starting_date", "current_balance")
end

def serialize_reconciliation(reconciliation)
  attrs = JSON.parse(reconciliation.to_json)
  attrs.extract!("id", "account_id", "statement_date", "statement_balance", "reconciled")
end