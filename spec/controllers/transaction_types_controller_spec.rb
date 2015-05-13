require 'rails_helper'

RSpec.describe TransactionTypesController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns a list of all transaction types' do
      transaction_type = FactoryGirl.create(:transaction_type)
      get :index, {}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['transaction_types'].length).to eq(1)
      expect(json['transaction_types'][0]).to eq(serialize_transaction_type(transaction_type))
    end
  end
end
