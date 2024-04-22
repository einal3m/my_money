# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CategoryType2Controller do
  describe 'GET index' do
    it 'returns a list of all category types' do
      get :index

      expect(response).to have_http_status(:ok)

      json = response.parsed_body

      expect(json['category_type2'].length).to eq(3)
      expect(json['category_type2'][0]['code']).to eq('transfer')
      expect(json['category_type2'][0]['name']).to eq('Transfer')
      expect(json['category_type2'][0]['editable']).to be(false)

      expect(json['category_type2'][1]['name']).to eq('Income')
      expect(json['category_type2'][2]['name']).to eq('Expense')
    end
  end
end
