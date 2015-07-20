require 'rails_helper'

RSpec.describe BankStatementsController, type: :controller do

  xdescribe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  xdescribe "GET #destroy" do
    it "returns http success" do
      get :destroy
      expect(response).to have_http_status(:success)
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
