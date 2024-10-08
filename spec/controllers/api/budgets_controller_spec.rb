# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::BudgetsController do
  describe 'GET #index' do
    it 'returns a list of accounts budgets' do
      account = FactoryBot.create(:account)
      budget = FactoryBot.create(:budget, account:)
      FactoryBot.create(:budget)

      get :index, params: { account_id: budget.account.id }

      expect(response).to have_http_status(:ok)

      json = response.parsed_body
      expect(json['budgets'].length).to eq(1)
      expect(json['budgets'][0]).to eq(serialized_budget(budget))
    end
  end

  describe 'GET #create' do
    context 'with valid params' do
      it 'creates a new budget' do
        account = FactoryBot.create(:account)
        budget_attrs = {
          account_id: account.id,
          description: 'My description',
          day_of_month: 2,
          amount: 1000
        }

        expect do
          post :create, params: { account_id: account.id, budget: budget_attrs }
        end.to change(Budget, :count).by(1)

        expect(response).to have_http_status(:created)

        budget = Budget.last
        json = response.parsed_body
        expect(json['budget']).to eq(serialized_budget(budget))
      end
    end

    context 'with invalid params' do
      it 'returns an error' do
        account = FactoryBot.create(:account)

        expect do
          post :create, params: { account_id: account.id, budget: { account_id: account.id } }
        end.not_to change(Budget, :count)

        expect(response).to have_http_status(:unprocessable_entity)

        json = response.parsed_body
        expect(json).to include('amount' => ["can't be blank"])
      end
    end
  end

  describe 'GET #update' do
    context 'with valid params' do
      it 'returns the updated budget' do
        account = FactoryBot.create(:account)
        budget = FactoryBot.create(:budget, account:)

        put :update, params: { id: budget.id, account_id: account.id, budget: {
          description: 'New description',
          day_of_month: 30,
          amount: 2000
        } }

        expect(response).to have_http_status(:ok)

        json = response.parsed_body

        expect(json['budget']['description']).to eq('New description')
        expect(json['budget']['day_of_month']).to eq(30)
        expect(json['budget']['amount']).to eq(2000)
      end

      it 'updates the budget' do
        account = FactoryBot.create(:account)
        budget = FactoryBot.create(:budget, account:)

        put :update, params: { id: budget.id, account_id: account.id, budget: {
          description: 'New description',
          day_of_month: 30,
          amount: 2000
        } }

        budget.reload

        expect(budget.description).to eq('New description')
        expect(budget.day_of_month).to eq(30)
        expect(budget.amount).to eq(2000)
      end
    end

    context 'with invalid params' do
      it 'returns an error' do
        account = FactoryBot.create(:account)
        budget = FactoryBot.create(:budget, account:)

        put :update, params: { id: budget.id, account_id: account.id, budget: { day_of_month: 42 } }

        expect(response).to have_http_status(:unprocessable_entity)

        json = response.parsed_body
        expect(json).to include('day_of_month' => ['must be less than or equal to 31'])
      end
    end
  end

  describe 'GET #destroy' do
    it 'destroys the requested budget' do
      budget = FactoryBot.create(:budget)

      expect do
        delete :destroy, params: { id: budget.id, account_id: budget.account.id }
      end.to change(Budget, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end

  def serialized_budget(budget)
    {
      'id' => budget.id,
      'account_id' => budget.account_id,
      'description' => budget.description,
      'day_of_month' => budget.day_of_month,
      'amount' => budget.amount
    }
  end
end
