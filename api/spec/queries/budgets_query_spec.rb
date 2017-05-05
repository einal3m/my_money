require_relative '../../models/budget'
require_relative '../../queries/budgets_query'
require_relative '../../serializers/budget_serializer'
require_relative '../factories/factory'

RSpec.describe BudgetsQuery do
  describe 'execute' do
    it 'returns the serialized budgets' do
      account = Factory.create_account
      budget = Factory.create_budget(account: account)
      _budget_for_different_account = Factory.create_budget

      serializer = instance_double BudgetSerializer
      expect(BudgetSerializer).to receive(:new).with([budget]).and_return(serializer)
      expect(serializer).to receive(:serialize).and_return([{ id: 1, description: 'My desc' }])

      expect(BudgetsQuery.new(account).execute).to eq(
        budgets: [{ id: 1, description: 'My desc' }]
      )
    end
  end
end
