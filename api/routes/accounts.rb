class MyMoney
  route('accounts') do |r|
    r.is do
      r.get do
        AccountsQuery.new.execute
      end

      r.post do
        id = AccountCommands.new.create(request_body(r)[:account])
        r.halt(201, { 'Location' => "#{request.path}/#{id}" }, id: id)
      end
    end

    r.is ':id' do |id|
      account = Account.with_pk!(id)

      r.put do
        AccountCommands.new.update(account, request_body(r)[:account])
        r.halt(204, '')
      end

      r.delete do
        AccountCommands.new.delete(account)
        r.halt(200, '')
      end
    end
  end
end
