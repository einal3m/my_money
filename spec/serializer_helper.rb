def serialize_account(account)

  attrs = JSON.parse(account.to_json)
  attrs["current_balance"] = account.current_balance.as_json
  attrs.extract!("id", "name", "bank", "starting_balance", "starting_date", "current_balance")
end
