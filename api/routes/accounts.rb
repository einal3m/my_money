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

      r.on 'budgets' do
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
  end
end
