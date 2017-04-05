require_relative '../queries/accounts_query'

class MyMoney
  route('accounts') do |r|
    r.get do
      AccountsQuery.new.execute
    end
  end
end
