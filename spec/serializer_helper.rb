def serialize_account(account)
  attrs = JSON.parse(account.to_json)
  attrs['current_balance'] = account.current_balance.as_json
  attrs.extract!('id', 'name', 'bank', 'starting_balance', 'starting_date', 'current_balance')
end

def serialize_reconciliation(reconciliation)
  attrs = JSON.parse(reconciliation.to_json)
  attrs.extract!('id', 'account_id', 'statement_date', 'statement_balance', 'reconciled')
end

def serialize_transaction(transaction)
  attrs = JSON.parse(transaction.to_json)
  attrs.extract!('id', 'account_id', 'date', 'amount', 'memo', 'notes', 'category_id', 'subcategory_id', 'balance', 'reconciliation_id')
end

def serialize_category_type(category_type)
  attrs = JSON.parse(category_type.to_json)
  attrs.extract!('id', 'name')
end

def serialize_subcategory(subcategory)
  attrs = JSON.parse(subcategory.to_json)
  attrs.extract!('id', 'category_id', 'name')
end

def serialize_category(subcategory)
  attrs = JSON.parse(subcategory.to_json)
  attrs.extract!('id', 'name', 'category_type_id')
end

def serialize_pattern(pattern)
  attrs = JSON.parse(pattern.to_json)
  attrs.extract!('id', 'account_id', 'match_text', 'notes', 'category_id', 'subcategory_id')
end
