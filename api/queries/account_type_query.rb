require_relative '../models/account_type'

class AccountTypeQuery
  def execute
    {
      account_types: account_types_hash
    }
  end

  def account_types_hash
    AccountType.values.map do |val|
      { code: val, name: val.capitalize }
    end
  end
end
