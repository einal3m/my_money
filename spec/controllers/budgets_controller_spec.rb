require 'rails_helper'

RSpec.describe BudgetsController, type: :controller do
  let (:budget_attrs) {
    {
      description: 'My description',
      day_of_month: 2,
      amount: 1000,
      credit: true
    }
  }

  describe 'GET #index' do
    it 'returns a list of accounts budgets' do
      budget = FactoryGirl.create(:budget, budget_attrs)
      budget_for_different_account = FactoryGirl.create(:budget)

      get :index, { account_id: budget.account.id }

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['budgets'].length).to eq(1)
      expect(json['budgets'][0]['description']).to eq('My description')
      expect(json['budgets'][0]['day_of_month']).to eq(2)
      expect(json['budgets'][0]['amount']).to eq(1000)
      expect(json['budgets'][0]['credit']).to eq(true)
    end
  end

  describe "GET #create" do
    before :each do
      @account = FactoryGirl.create(:account)
      @budget_attrs = budget_attrs.merge(account_id: @account.id)
      @invalid_budget_attrs = { account_id: @account.id }
    end

    context 'with valid params' do
      it 'creates a new budget' do
        expect {
          post :create, { account_id: @account.id, budget: @budget_attrs }
        }.to change(Budget, :count).by(1)

        expect(response).to be_success
      end

      it 'returns created budget on success' do
        post :create, { account_id: @account.id, budget: @budget_attrs }

        expect(response).to be_success

        json = JSON.parse(response.body)
        expect(json['description']).to eq('My description')
        expect(json['day_of_month']).to eq(2)
        expect(json['amount']).to eq(1000)
        expect(json['credit']).to eq(true)
      end
    end

    context 'with invalid params' do
      it 'returns an error' do
        post :create, { account_id: @account.id, budget: @invalid_budget_attrs }

        expect(response.status).to eq(422)

        json = JSON.parse(response.body)
        expect(json).to include('amount' => ["can't be blank"])
      end

      it 'does not create a budget' do
        expect {
          post :create, { account_id: @account.id, budget: @invalid_budget_attrs }
        }.not_to change(Budget, :count)
      end
    end
  end

  describe 'GET #update' do
    before :each do
      @account = FactoryGirl.create(:account)
      @budget = FactoryGirl.create(:budget, budget_attrs)
    end

    context 'with valid params' do
      it 'returns the updated budget' do
        put :update, { id: @budget.id, account_id: @account.id, budget: {
          description: 'New description',
          day_of_month: 30,
          amount: 2000,
          credit: false
        } }

        expect(response).to be_success

        json = JSON.parse(response.body)
        expect(json['description']).to eq('New description')
        expect(json['day_of_month']).to eq(30)
        expect(json['amount']).to eq(2000)
        expect(json['credit']).to eq(false)
      end

      it 'updates the budget' do
        put :update, { id: @budget.id, account_id: @account.id, budget: {
          description: 'New description',
          day_of_month: 30,
          amount: 2000,
          credit: false
        } }

        @budget.reload

        @budget.description = 'New description'
        @budget.day_of_month = 30
        @budget.amount = 2000
        @budget.credit = false
      end
    end

    context 'with invalid params' do
      it 'returns an error' do
        put :update, { id: @budget.id, account_id: @account.id, budget: { day_of_month: 42 } }

        expect(response.status).to eq(422)

        json = JSON.parse(response.body)
        expect(json).to include('day_of_month' => ["must be less than or equal to 31"])
      end
    end
  end

  describe 'GET #destroy' do
    it 'destroys the requested budget' do
      budget = FactoryGirl.create(:budget)
      expect {
        delete :destroy, { id: budget.id, account_id: budget.account.id }
      }.to change(Budget, :count).by(-1)
      expect(response).to be_success
    end
  end
end
