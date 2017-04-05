require_relative '../models/account'
require_relative '../serializers/account_serializer'

class AccountsQuery
  def execute
    AccountSerializer.new(Account.all).serialize
  end
end
