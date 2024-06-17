# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::AccountTypesController do
  describe 'GET index' do
    it 'returns a list of all account types' do
      get :index

      expect(response).to have_http_status(:ok)

      json = response.parsed_body

      expect(json['account_types'].length).to eq(3)
      expect(json['account_types'][0]).to eq('id' => 1, 'code' => 'savings', 'name' => 'Savings')
      expect(json['account_types'][1]).to eq('id' => 2, 'code' => 'share', 'name' => 'Share')
      expect(json['account_types'][2]).to eq('id' => 3, 'code' => 'loan', 'name' => 'Loan')
    end
  end
end
