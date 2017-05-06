require_relative '../../queries/budgets_query'
require_relative '../../commands/budget_commands'
require_relative '../factories/factory'
require 'rack/test'

RSpec.describe '/accounts/:account_id/budgets' do
  include Rack::Test::Methods

  let(:account) { Factory.create_account }

  def app
    MyMoney.app
  end

  describe 'GET budgets' do
    it 'calls the budgets query and returns the result' do
      query = instance_double BudgetsQuery
      expect(BudgetsQuery).to receive(:new).with(account).and_return(query)
      expect(query).to receive(:execute).and_return(budgets: ['one'])

      get "/accounts/#{account.id}/budgets"

      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq('budgets' => ['one'])
    end
  end

  describe 'POST budget' do
    it 'calls the create budget command and returns 201' do
      params = {
        account_id: account.id,
        description: 'my description',
        day_of_month: 2,
        amount: 1000
      }

      command = instance_double BudgetCommands
      expect(BudgetCommands).to receive(:new).and_return(command)
      expect(command).to receive(:create).with(params).and_return(11)

      post "/accounts/#{account.id}/budgets", JSON.generate(budget: params)

      expect(last_response.status).to eq(201)
      expect(JSON.parse(last_response.body)).to eq('id' => 11)
    end
  end

  describe 'PUT accounts/:account_id/budget/:id' do
    it 'calls the update budget command and returns 204' do
      budget = Factory.create_budget(account: account)
      params = { description: 'my new description' }

      command = instance_double BudgetCommands
      expect(BudgetCommands).to receive(:new).and_return(command)
      expect(command).to receive(:update).with(budget, params)

      put "/accounts/#{account.id}/budgets/#{budget.id}", JSON.generate(budget: params)

      expect(last_response.status).to eq(204)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if budget does not exist' do
      expect(BudgetCommands).not_to receive(:new)

      put "/accounts/#{account.id}/budgets/11", JSON.generate(budget: 'params')

      expect(last_response.status).to eq(404)
    end
  end

  describe 'DELETE accounts/:id' do
    it 'calls the delete budget command and returns 200' do
      budget = Factory.create_budget

      command = instance_double BudgetCommands
      expect(BudgetCommands).to receive(:new).and_return(command)
      expect(command).to receive(:delete).with(budget)

      delete "/accounts/#{account.id}/budgets/#{budget.id}"

      expect(last_response.status).to eq(200)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if account does not exist' do
      expect(BudgetCommands).not_to receive(:new)

      delete "/accounts/#{account.id}/budgets/11"

      expect(last_response.status).to eq(404)
    end
  end
end
