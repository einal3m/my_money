require_relative '../factories/factory'
require_relative '../../models/budget'
require_relative '../../serializers/budget_serializer'

RSpec.describe BudgetSerializer do
  describe 'serialize (array)' do
    it 'returns an array of hashes of category attributes' do
      account = Factory.create_account
      budget = Factory.create_budget(
        account: account,
        description: 'My description',
        day_of_month: 15,
        amount: 1000
      )

      serialized_budgets = BudgetSerializer.new([budget]).serialize

      expect(serialized_budgets.length).to eq(1)

      expect(serialized_budgets[0].keys.sort).to eq(
        [:id, :account_id, :description, :day_of_month, :amount].sort
      )

      expect(serialized_budgets[0][:id]).to eq(budget.id)
      expect(serialized_budgets[0][:account_id]).to eq(account.id)
      expect(serialized_budgets[0][:description]).to eq('My description')
      expect(serialized_budgets[0][:day_of_month]).to eq(15)
      expect(serialized_budgets[0][:amount]).to eq(1000)
    end
  end
end
