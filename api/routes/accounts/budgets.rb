class MyMoney
  route('budgets') do |r|
    account = Account.with_pk!(r.path.split('/')[2].to_i)

    r.is do
      # GET accounts/:account_id/budgets
      r.get do
        BudgetsQuery.new(account).execute
      end

      # POST accounts/:account_id/budgets
      r.post do
        account_id = BudgetCommands.new.create(request_body(r)[:budget])
        r.halt(201, { 'Location' => "#{request.path}/#{account_id}" }, id: account_id)
      end
    end

    r.on ':budget_id' do |budget_id|
      budget = Budget.with_pk!(budget_id)

      r.is do
        # PUT accounts/:accounts_id/budgets/:budget_id
        r.put do
          BudgetCommands.new.update(budget, request_body(r)[:budget])
          r.halt(204, '')
        end

        # DELETE accounts/:accounts_id/budgets/:budget_id
        r.delete do
          BudgetCommands.new.delete(budget)
          r.halt(200, '')
        end
      end
    end
  end
end
