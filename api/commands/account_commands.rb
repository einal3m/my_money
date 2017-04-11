class AccountCommands
  def create(params)
    account = Account.create(params)
    account.id
  end

  def update(account, params)
    account.update(params)
  end

  def delete(account)
    account.delete
  end
end
