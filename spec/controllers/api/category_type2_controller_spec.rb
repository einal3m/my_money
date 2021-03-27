# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CategoryType2Controller, type: :controller do
  describe 'GET index' do
    it 'returns a list of all category types' do
      get :index

      expect(response.status).to eq(200)

      json = JSON.parse(response.body)

      expect(json['category_type2'].length).to eq(3)
      expect(json['category_type2'][0]['code']).to eq('transfer')
      expect(json['category_type2'][0]['name']).to eq('Transfer')
      expect(json['category_type2'][0]['editable']).to eq(false)

      expect(json['category_type2'][1]['name']).to eq('Income')
      expect(json['category_type2'][2]['name']).to eq('Expense')
    end
  end
end
