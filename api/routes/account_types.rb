require_relative '../queries/account_type_query'

class MyMoney
  route('account_types') do |r|
    r.get do
      AccountTypeQuery.new.execute
    end
  end
end
