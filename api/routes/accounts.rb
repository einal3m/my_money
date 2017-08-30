class MyMoney
  route('accounts') do |r|
    r.is do
      # GET accounts
      r.get do
        AccountsQuery.new.execute
      end

      # POST accounts
      r.post do
        id = AccountCommands.new.create(request_body(r)[:account])
        r.halt(201, { 'Location' => "#{request.path}/#{id}" }, id: id)
      end
    end

    r.on ':account_id' do |account_id|
      r.multi_route

      account = Account.with_pk!(account_id)

      r.is do
        # PUT accounts/:account_id
        r.put do
          AccountCommands.new.update(account, request_body(r)[:account])
          r.halt(204, '')
        end

        # DELETE accounts/:account_id
        r.delete do
          AccountCommands.new.delete(account)
          r.halt(200, '')
        end
      end
    end
  end
end
