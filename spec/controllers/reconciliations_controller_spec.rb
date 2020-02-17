# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReconciliationsController, type: :controller do
  describe 'GET index' do
    it 'returns all reconciliations for the account' do
      reconciliation = FactoryBot.create(:reconciliation)

      get :index, params: { account_id: reconciliation.account_id }

      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['reconciliations'].length).to eq(1)
      expect(json['reconciliations'][0]).to eq(serialized_reconciliation(reconciliation))
    end
  end

  describe 'GET show' do
    it 'returns the specified reconciliation' do
      reconciliation = FactoryBot.create(:reconciliation)

      get :show, params: { account_id: reconciliation.account_id, id: reconciliation.id }

      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['reconciliation']).to eq(serialized_reconciliation(reconciliation))
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      it 'creates a new Reconciliation' do
        account = FactoryBot.create(:account)

        expect do
          post :create, params: {
            account_id: account,
            reconciliation: FactoryBot.attributes_for(:reconciliation, account_id: account.id)
          }
        end.to change(Reconciliation, :count).by(1)
      end

      it 'returns the reconciliation' do
        account = FactoryBot.create(:account)

        post :create, params: {
          account_id: account,
          reconciliation: FactoryBot.attributes_for(:reconciliation, account_id: account.id)
        }
        expect(response.status).to eq(201)

        reconciliation = Reconciliation.first
        json = JSON.parse(response.body)
        expect(json['reconciliation']).to eq(serialized_reconciliation(reconciliation))
      end
    end

    context 'with invalid params' do
      it 'does not create a new reconciliation' do
        account = FactoryBot.create(:account)

        expect do
          post :create, params: {
            account_id: account,
            reconciliation: FactoryBot.attributes_for(:reconciliation_invalid, account_id: account.id)
          }
        end.not_to change(Reconciliation, :count)

        expect(response.status).to be(422)
      end
    end
  end

  describe 'PUT update' do
    context 'with valid params' do
      it 'updates and returns the requested reconciliation' do
        reconciliation = FactoryBot.create(:reconciliation)

        put :update, params: {
          account_id: reconciliation.account_id,
          id: reconciliation.id,
          reconciliation: { statement_balance: '977', statement_date: '2014-07-02' }
        }

        reconciliation.reload
        expect(reconciliation.statement_date).to eq(Date.parse('2014-07-02'))
        expect(reconciliation.statement_balance).to eq(977)

        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['reconciliation']).to eq(serialized_reconciliation(reconciliation))
      end
    end

    context 'with transactions' do
      it 'sets reconciled to true and updates transactions' do
        reconciliation = FactoryBot.create(:reconciliation, reconciled: false)
        transaction = FactoryBot.create(:transaction, account: reconciliation.account, reconciliation: nil)

        put :update, params: {
          account_id: reconciliation.account_id,
          id: reconciliation.id,
          reconciled: true,
          transactions: [{ id: transaction.id }]
        }

        reconciliation.reload
        transaction.reload
        expect(reconciliation.reconciled).to be_truthy
        expect(transaction.reconciliation).to eq(reconciliation)
      end
    end

    context 'with invalid params' do
      it 'returns an error code' do
        reconciliation = FactoryBot.create(:reconciliation)

        put :update, params: {
          account_id: reconciliation.account_id,
          id: reconciliation.id,
          reconciliation: { statement_date: nil }

        }

        expect(response.status).to be(422)
      end
    end
  end

  def serialized_reconciliation(reconciliation)
    {
      'id' => reconciliation.id,
      'account_id' => reconciliation.account_id,
      'statement_date' => date_string(reconciliation.statement_date),
      'statement_balance' => reconciliation.statement_balance,
      'reconciled' => reconciliation.reconciled
    }
  end

  def date_string(date)
    date&.strftime('%Y-%m-%d')
  end
end
