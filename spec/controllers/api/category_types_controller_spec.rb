# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CategoryTypesController do
  describe 'GET index' do
    it 'returns a list of all category types' do
      category_type = FactoryBot.create(:category_type)
      get :index

      expect(response).to have_http_status(:ok)

      json = response.parsed_body
      expect(json['category_types'].length).to eq(1)
      expect(json['category_types'][0]['id']).to eq(category_type.id)
      expect(json['category_types'][0]['name']).to eq(category_type.name)
    end
  end
end
