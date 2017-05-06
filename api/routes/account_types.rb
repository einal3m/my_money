class MyMoney
  route('account_types') do |r|
    # GET account_types
    r.get do
      AccountTypeQuery.new.execute
    end
  end
end
