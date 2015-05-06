require 'rails_helper'

RSpec.describe AccountTypesController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns a list of all account types' do
      account_type = FactoryGirl.create(:account_type)
      get :index, {}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['account_types'].length).to eq(1)
      expect(json['account_types'][0]).to eq(serialize_account_type(account_type))
    end
  end
end
