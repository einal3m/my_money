class MyMoney
  route('account_types') do |r|
    r.get do
      AccountTypeQuery.new.execute
    end
  end
end
