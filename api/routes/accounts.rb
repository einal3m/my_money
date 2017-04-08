require_relative '../queries/accounts_query'
require_relative '../commands/account_commands'

class MyMoney
  route('accounts') do |r|
    r.get do
      AccountsQuery.new.execute
    end

    r.post do
      id = AccountCommands.new(r.params['account']).create
      r.halt(201, 'Location' => "#{request.path}/#{id}")
    end
  end
end
