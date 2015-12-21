require 'rails_helper'

RSpec.describe CategoryTypesController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns a list of all category types' do
      category_type = FactoryGirl.create(:category_type)
      get :index, {}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['category_types'].length).to eq(1)
      expect(json['category_types'][0]['id']).to eq(category_type.id)
      expect(json['category_types'][0]['name']).to eq(category_type.name)
    end
  end
end
