require_relative '../../commands/budget_commands'
require_relative '../../models/budget'
require_relative '../factories/factory'

RSpec.describe BudgetCommands do
  let(:account) { Factory.create_account }

  describe 'create' do
    context 'with valid params' do
      it 'creates the budget and returns the id' do
        params = {
          account_id: account.id,
          description: 'my description',
          day_of_month: 2,
          amount: 1000
        }

        id = BudgetCommands.new.create(params)

        budget = Budget.first
        expect(budget.id).to eq(id)
        expect(budget.description).to eq('my description')
        expect(budget.day_of_month).to eq(2)
        expect(budget.amount).to eq(1000)
      end
    end
  end

  describe 'update' do
    context 'with valid params' do
      it 'updates the budget' do
        budget = Factory.create_budget
        params = { description: 'new description' }

        BudgetCommands.new.update(budget, params)

        updated_budget = Budget[budget.id]
        expect(updated_budget.description).to eq('new description')
      end
    end
  end

  describe 'delete' do
    it 'deletes the budget' do
      budget = Factory.create_budget

      BudgetCommands.new.delete(budget)

      expect(Budget[budget.id]).to be_nil
    end
  end
end
