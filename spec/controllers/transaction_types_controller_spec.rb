require 'rails_helper'

RSpec.describe TransactionTypesController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns a list of all transaction types' do
      get :index, {}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
p json
      expect(json['transaction_types'].length).to eq(5)
      expect(json['transaction_types'][0]['name']).to eq('Purchase')
      expect(json['transaction_types'][1]['name']).to eq('Dividend')
      expect(json['transaction_types'][2]['name']).to eq('Unit Price Update')
      expect(json['transaction_types'][3]['name']).to eq('Sale')
      expect(json['transaction_types'][4]['name']).to eq('Bank Transaction')
    end
  end
end
