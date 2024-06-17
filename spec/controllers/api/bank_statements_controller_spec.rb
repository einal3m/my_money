# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::BankStatementsController do
  describe 'GET #index' do
    it 'returns http success' do
      account = FactoryBot.create(:account)
      bank_statement1 = FactoryBot.create(:bank_statement, account:)
      bank_statement2 = FactoryBot.create(:bank_statement, account:)

      get :index, params: { account_id: account.id }

      expect(response).to have_http_status(:ok)

      json = response.parsed_body
      expect(json['bank_statements'].length).to eq(2)
      expect(json['bank_statements'][0]).to eq(serialized_bank_statement(bank_statement2))
      expect(json['bank_statements'][1]).to eq(serialized_bank_statement(bank_statement1))
    end
  end

  describe 'GET #destroy' do
    it 'successfully deletes bank statement and its transactions' do
      bank_statement = FactoryBot.create(:bank_statement)
      transaction = FactoryBot.create(:transaction, bank_statement:)

      get :destroy, params: { account_id: bank_statement.account_id, id: bank_statement.id }

      expect(response).to have_http_status(:no_content)
      expect(BankStatement.exists?(bank_statement.id)).to be_falsy # rubocop:disable RSpec/PredicateMatcher
      expect(Transaction.exists?(transaction.id)).to be_falsy # rubocop:disable RSpec/PredicateMatcher
    end

    it 'returns error when bank statement contains reconciled transactions' do
      bank_statement = FactoryBot.create(:bank_statement)
      reconciliation = FactoryBot.create(:reconciliation, account: bank_statement.account)
      FactoryBot.create(:transaction, bank_statement:, reconciliation:)
      expect(bank_statement.transactions).not_to receive(:destroy) # rubocop:disable RSpec/MessageSpies
      expect(bank_statement).not_to receive(:destroy) # rubocop:disable RSpec/MessageSpies

      get :destroy, params: { account_id: bank_statement.account_id, id: bank_statement.id }

      expect(response).to have_http_status(:unprocessable_entity)
      json = response.parsed_body
      expect(json['message']).to eq('Cannot delete a bank statement with reconciled transactions')
    end
  end

  describe 'GET #create' do
    it 'returns http success' do
      account = FactoryBot.create(:account)
      transaction_attrs = [
        { date: '2015-01-01', amount: 500, account_id: account.id, import: true },
        { date: '2015-02-01', amount: 520, account_id: account.id }
      ]

      get :create, params: {
        account_id: account.id,
        transactions: transaction_attrs,
        bank_statement: {
          account_id: account.id,
          file_name: 'sample.qif'
        }
      }

      bs = account.bank_statements.last
      expect(bs.date).to eq(Time.zone.today)
      expect(bs.file_name).to eq('sample.qif')
      expect(bs.transaction_count).to eq(2)
      expect(bs.transactions.length).to eq(2)

      expect(response).to have_http_status(:created)
      json = response.parsed_body
      expect(json['bank_statement']).to eq(serialized_bank_statement(bs))
    end

    it 'returns validation error' do
      account = FactoryBot.create(:account)
      transaction_attrs = [
        { amount: 500, account_id: account.id, import: true },
        { date: '2015-02-01', amount: 520, account_id: account.id }
      ]

      get :create, params: {
        account_id: account.id,
        transactions: transaction_attrs,
        bank_statement: {
          account_id: account.id,
          file_name: 'sample.qif'
        }
      }

      expect(response).to have_http_status(:unprocessable_entity)
      json = response.parsed_body
      expect(json['message']).to eq('Validation failed: Transactions is invalid')
    end
  end

  def serialized_bank_statement(bank_statement)
    {
      'id' => bank_statement.id,
      'account_id' => bank_statement.account_id,
      'date' => date_string(bank_statement.date),
      'file_name' => bank_statement.file_name,
      'transaction_count' => bank_statement.transaction_count
    }
  end

  def date_string(date)
    date&.strftime('%Y-%m-%d')
  end
end
