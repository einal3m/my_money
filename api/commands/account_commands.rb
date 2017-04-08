require_relative '../models/account'

class AccountCommands
  def initialize(params)
    @params = params
  end

  def create
    account = Account.create(@params)
    account.id
  end
end
