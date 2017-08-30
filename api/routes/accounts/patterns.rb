class MyMoney
  route('patterns') do |r|
    account = Account.with_pk!(r.path.split('/')[2].to_i)

    r.is do
      # GET accounts/:account_id/patterns
      r.get do
        PatternsQuery.new(account).execute
      end

      # POST accounts/:account_id/patterns
      r.post do
        pattern_id = PatternCommands.new.create(request_body(r)[:pattern])
        r.halt(201, { 'Location' => "#{request.path}/#{pattern_id}" }, id: pattern_id)
      end
    end

    r.on ':pattern_id' do |pattern_id|
      pattern = Pattern.with_pk!(pattern_id)

      r.is do
        # PUT accounts/:accounts_id/pattern/:pattern_id
        r.put do
          PatternCommands.new.update(pattern, request_body(r)[:pattern])
          r.halt(204, '')
        end

        # DELETE accounts/:accounts_id/pattern/:pattern_id
        r.delete do
          PatternCommands.new.delete(pattern)
          r.halt(200, '')
        end
      end
    end
  end
end
