# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransactionTypesController, type: :controller do
  describe 'GET index' do
    it 'returns a list of all transaction types' do
      get :index

      expect(response.status).to eq(200)

      json = JSON.parse(response.body)

      expect(json['transaction_types'].length).to eq(5)
      expect(json['transaction_types'][0]['name']).to eq('Purchase')
      expect(json['transaction_types'][1]['name']).to eq('Dividend')
      expect(json['transaction_types'][2]['name']).to eq('Unit Price Update')
      expect(json['transaction_types'][3]['name']).to eq('Sale')
      expect(json['transaction_types'][4]['name']).to eq('Bank Transaction')
    end
  end
end
