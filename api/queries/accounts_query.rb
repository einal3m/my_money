class AccountsQuery
  def execute
    { accounts: AccountSerializer.new(Account.all).serialize }
  end
end
