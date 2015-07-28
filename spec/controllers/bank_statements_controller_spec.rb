require 'rails_helper'

RSpec.describe BankStatementsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      bank_statement = FactoryGirl.create(:bank_statement)
      get :index, { account_id: bank_statement.account_id }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['bank_statements'].length).to eq(1)
      expect(json['bank_statements'][0]['id']).to eq(bank_statement.id)
      expect(json['bank_statements'][0]['account_id']).to eq(bank_statement.account.id)
      expect(Date.parse(json['bank_statements'][0]['date'])).to eq(bank_statement.date)
      expect(json['bank_statements'][0]['file_name']).to eq(bank_statement.file_name)
      expect(json['bank_statements'][0]['transaction_count']).to eq(bank_statement.transaction_count)
    end
  end

  describe "GET #destroy" do
    it "successfully deletes bank statement and its transactions" do
      bank_statement = FactoryGirl.create(:bank_statement)
      transaction = FactoryGirl.create(:transaction, bank_statement: bank_statement)

      get :destroy, { account_id: bank_statement.account_id, id: bank_statement.id }
      
      expect(response).to have_http_status(:success)
      expect(BankStatement.exists?(bank_statement.id)).to be_falsy
      expect(Transaction.exists?(transaction.id)).to be_falsy
    end

    it 'returns error when bank statement contains reconciled transactions' do
      bank_statement = FactoryGirl.create(:bank_statement)
      reconciliation = FactoryGirl.create(:reconciliation, account: bank_statement.account)
      transaction = FactoryGirl.create(:transaction, bank_statement: bank_statement, reconciliation: reconciliation)
      expect(bank_statement.transactions).not_to receive(:destroy)
      expect(bank_statement).not_to receive(:destroy)

      get :destroy, { account_id: bank_statement.account_id, id: bank_statement.id }

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Cannot delete a bank statement with reconciled transactions')
    end
  end

  describe "GET #create" do
    let (:account) { FactoryGirl.create(:account) }
    let (:file_name) { 'sample.qif' }
    let (:transaction_attrs) do 
      [
        {date: '2015-01-01', amount: 500, account_id: account.id, import: true },
        {date: '2015-02-01', amount: 520, account_id: account.id }
      ]
    end

    it "returns http success" do
      make_create_request

      bs = account.bank_statements.last
      expect(bs.date).to eq(Date.today)
      expect(bs.file_name).to eq(file_name)
      expect(bs.transaction_count).to eq(2)
      expect(bs.transactions.length).to eq(2)

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['bank_statement']).to eq({
        'id' => bs.id,
        'account_id' => account.id,
        'file_name' => file_name,
        'date' => Date.today.strftime('%Y-%m-%d'),
        'transaction_count' => 2
      })

    end

    it "returns validation error" do
      transaction_attrs[0].delete(:date)
      make_create_request
      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Validation failed: Transactions is invalid')
    end
  end

  def make_create_request
      get :create, {
        account_id: account.id,
        transactions: transaction_attrs,
        bank_statement: {
          account_id: account.id,
          file_name: file_name
        }
      }
  end
end
