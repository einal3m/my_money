require 'rails_helper'

RSpec.describe PatternsController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns all patterns for given account' do
      pattern = FactoryGirl.create(:pattern)
      get :index, { account_id: pattern.account.id }, valid_session

      json = JSON.parse(response.body)
      expect(response).to be_success
      expect(json['patterns'].length).to eq(1)
      expect(json['patterns'][0]).to eq(serialize_pattern(pattern))
    end
  end

  describe 'POST create' do
    describe 'with valid params' do
      it 'creates a new Pattern' do
        account = FactoryGirl.create(:account)
        expect {
          post :create, { account_id: account.id, pattern: build_attributes(:pattern) }, valid_session
        }.to change(Pattern, :count).by(1)

        json = JSON.parse(response.body)
        expect(response).to be_success

        pattern = Pattern.first
        expect(json['pattern']).to eq(serialize_pattern(pattern))
      end
    end

    describe 'with invalid params' do
      it 'returns an error and does not create the pattern' do
        account = FactoryGirl.create(:account)
        expect {
          post :create, { account_id: account.id, pattern: build_attributes(:pattern_invalid) }, valid_session
        }.not_to change(Pattern, :count)

        json = JSON.parse(response.body)
        expect(response.status).to eq(422)
        expect(json).to eq('match_text' => ["can't be blank"])
      end
    end
  end

  describe 'PUT update' do
    context 'with valid params' do
      it 'updates the requested pattern' do
        pattern = FactoryGirl.create(:pattern)
        new_subcategory = FactoryGirl.create(:subcategory)
        new_category = new_subcategory.category

        put :update, { id: pattern.id, pattern: {
          match_text: 'New Text',
          notes: 'New Note',
          category_id: new_category.id,
          subcategory_id: new_subcategory.id
        } }, valid_session

        pattern.reload
        expect(pattern.match_text).to eq('New Text')
        expect(pattern.notes).to eq('New Note')
        expect(pattern.category).to eq(new_category)
        expect(pattern.subcategory).to eq(new_subcategory)

        json = JSON.parse(response.body)
        expect(response).to be_success
        expect(json['pattern']).to eq(serialize_pattern(pattern))
      end
    end

    context 'with invalid params' do
      it 'assigns the pattern as @pattern' do
        pattern = FactoryGirl.create(:pattern)
        put :update, { id: pattern.id, pattern: build_attributes(:pattern_invalid) }, valid_session

        json = JSON.parse(response.body)
        expect(response.status).to eq(422)
        expect(json).to eq('match_text' => ["can't be blank"])
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested pattern' do
      pattern = FactoryGirl.create(:pattern)
      expect {
        delete :destroy, { id: pattern.id }, valid_session
      }.to change(Pattern, :count).by(-1)
      expect(response).to be_success
    end
  end
end
