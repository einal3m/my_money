# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::AccountsController, type: :controller do
  describe 'GET index' do
    context "when no params are provided" do
      let(:params) {{}}

      it 'returns a list of all active accounts' do
        account = FactoryBot.create(:account, starting_balance: 1000)
        a = FactoryBot.create(:account, deleted_at: '2014-02-02')

        get :index, params

        expect(response.status).to eq(200)

        json = JSON.parse(response.body)
        expect(json['accounts'].length).to eq(1)
        expect(json['accounts'][0]).to eq(serialized_account(account))
      end
    end

    context "when deactivated param is provided" do
      let(:params) {{include_deactivated: true}}
      
      it 'returns a list of all active accounts' do
        account = FactoryBot.create(:account, starting_balance: 1000)
        deactivated_account = FactoryBot.create(:account, deleted_at: '2014-02-02')

        get :index, params: params

        expect(response.status).to eq(200)

        json = JSON.parse(response.body)
        expect(json['accounts'].length).to eq(2)
        expect(json['accounts'][0]).to eq(serialized_account(account))
        expect(json['accounts'][1]).to eq(serialized_account(deactivated_account))
      end
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      context 'Savings account' do
        it 'creates a new Savings Account' do
          expect do
            post :create, params: { account: FactoryBot.attributes_for(:account) }
          end.to change(Account, :count).by(1)
        end

        it 'sends the account' do
          post :create, params: { account: FactoryBot.attributes_for(:account) }
          account = Account.first

          json = JSON.parse(response.body)
          expect(json['account']).to eq(serialized_account(account))
        end
      end

      context 'Share account' do
        it 'creates a new Share Account' do
          expect do
            post :create, params: { account: { account_type: 'share', name: 'Name', ticker: 'TCK' } }
          end.to change(Account, :count).by(1)
        end

        it 'sends the account' do
          post :create, params: { account: { account_type: 'share', name: 'Name', ticker: 'TCK' } }
          account = Account.first

          expect(account.name).to eq('Name')
          expect(account.ticker).to eq('TCK')
          expect(account.starting_balance).to eq(0)

          json = JSON.parse(response.body)
          expect(json['account']).to eq(serialized_account(account))
        end
      end

      context 'Loan account' do
        it 'creates a new Loan Account' do
          expect do
            post :create, params: { account: {
              account_type: 'loan',
              name: 'Name',
              limit: 3000,
              term: 30,
              interest_rate: 3.45,
              starting_date: '2016-12-31'
            } }
          end.to change(Account, :count).by(1)
        end

        it 'sends the account' do
          post :create, params: { account: {
            account_type: 'loan',
            name: 'Name',
            limit: 3000,
            term: 30,
            interest_rate: 3.45,
            starting_date: '2016-12-31'
          } }

          account = Account.first
          json = JSON.parse(response.body)
          expect(json['account']).to eq(serialized_account(account))
        end
      end
    end

    context 'with invalid params' do
      it 'does not save a new Account' do
        expect do
          post :create, params: { account: FactoryBot.attributes_for(:account_invalid) }
        end.not_to change(Account, :count)
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'PUT update' do
    before :each do
    end

    context 'with valid params' do
      it 'updates the requested account' do
        account = FactoryBot.create(:account)

        put :update, params: {
          id: account.id,
          account: FactoryBot.attributes_for(
            :account,
            name: 'New Account2',
            bank: 'New Bank2',
            starting_balance: 800,
            starting_date: '2014-02-02'
          )
        }

        expect(response.status).to eq(200)

        json = JSON.parse(response.body)
        account.reload
        expect(json['account']).to eq(serialized_account(account))
        expect(account.name).to eq('New Account2')
        expect(account.bank).to eq('New Bank2')
        expect(account.starting_balance).to eq(800)
        expect(account.starting_date).to eq(Date.parse('2014-02-02'))
      end
    end

    context 'with invalid params' do
      it 'does not update the account' do
        account = FactoryBot.create(:account)

        expect do
          put :update, params: { id: account.id, account: FactoryBot.attributes_for(:account_invalid) }
        end.not_to(change { account.updated_at })
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'POST deactivate' do
    it 'soft deletes the requested account' do
      account = FactoryBot.create(:account)

      post :deactivate, params: { id: account.id }

      expect(response.status).to eq(204)
      account.reload
      expect(account.deleted_at).not_to eq(nil)
    end
  end

  describe 'POST reactivate' do
    it 'un-soft-deletes the requested account' do
      account = FactoryBot.create(:account, deleted_at: '2014-02-02')

      post :reactivate, params: { id: account.id }

      expect(response.status).to eq(204)
      account.reload
      expect(account.deleted_at).to eq(nil)
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested account' do
      account = FactoryBot.create(:account)

      expect do
        delete :destroy, params: { id: account.id }
      end.to change(Account, :count).by(-1)
      expect(response.status).to eq(204)
    end

    it 'does not destroy the requested account if there are transactions' do
      account = FactoryBot.create(:account)
      FactoryBot.create(:transaction, account: account)

      expect do
        delete :destroy, params: { id: account.id }
      end.not_to change(Account, :count)

      expect(response.status).to eq(422)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Cannot delete an account that has transactions')
    end
  end

  def serialized_account(account)
    {
      'id' => account.id,
      'account_type' => account.account_type.code,
      'name' => account.name,
      'bank' => account.bank,
      'ticker' => account.ticker,
      'starting_balance' => account.starting_balance,
      'starting_date' => date_string(account.starting_date),
      'current_balance' => account.current_balance,
      'limit' => account.limit,
      'term' => account.term,
      'interest_rate' => rate_string(account.interest_rate),
      'deleted_at' => date_string(account.deleted_at)
    }
  end

  def date_string(date)
    date&.strftime('%Y-%m-%d')
  end

  def rate_string(rate)
    rate.nil? ? nil : rate.to_s
  end
end
