class MyMoney
  route('patterns') do |r|
    account = Account.with_pk!(r.path.split('/')[2].to_i)

    binding.pry
    r.is do
      # GET accounts/:account_id/patterns
      r.get do
        PatternsQuery.new(account).execute
      end
    end
  end
end
