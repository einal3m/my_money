# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PatternsController, type: :controller do
  describe 'GET index' do
    it 'returns all patterns for given account' do
      pattern = FactoryBot.create(:pattern)

      get :index, params: { account_id: pattern.account.id }

      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['patterns'].length).to eq(1)
      expect(json['patterns'][0]).to eq(serialized_pattern(pattern))
    end
  end

  describe 'POST create' do
    describe 'with valid params' do
      it 'creates a new Pattern' do
        account = FactoryBot.create(:account)
        category = FactoryBot.create(:category)
        subcategory = FactoryBot.create(:subcategory)
        pattern_attrs = FactoryBot.attributes_for(
          :pattern,
          account_id: account.id,
          category_id: category.id,
          subcategory_id: subcategory.id
        )

        expect do
          post :create, params: { account_id: account.id, pattern: pattern_attrs }
        end.to change(Pattern, :count).by(1)

        expect(response.status).to eq(201)

        json = JSON.parse(response.body)
        pattern = Pattern.first
        expect(json['pattern']).to eq(serialized_pattern(pattern))
      end
    end

    describe 'with invalid params' do
      it 'returns an error and does not create the pattern' do
        account = FactoryBot.create(:account)
        category = FactoryBot.create(:category)

        expect do
          post :create, params: {
            account_id: account.id,
            pattern: FactoryBot.attributes_for(:pattern, account_id: account.id, category_id: category.id)
          }
        end.not_to change(Pattern, :count)

        expect(response.status).to eq(422)
        json = JSON.parse(response.body)
        expect(json).to eq('subcategory' => ['must exist'])
      end
    end
  end

  describe 'PUT update' do
    context 'with valid params' do
      it 'updates the requested pattern' do
        pattern = FactoryBot.create(:pattern)
        new_subcategory = FactoryBot.create(:subcategory)
        new_category = new_subcategory.category

        put :update, params: { id: pattern.id, account_id: pattern.account.id, pattern: {
          match_text: 'New Text',
          notes: 'New Note',
          category_id: new_category.id,
          subcategory_id: new_subcategory.id
        } }

        pattern.reload
        expect(pattern.match_text).to eq('New Text')
        expect(pattern.notes).to eq('New Note')
        expect(pattern.category).to eq(new_category)
        expect(pattern.subcategory).to eq(new_subcategory)

        json = JSON.parse(response.body)
        expect(response.status).to eq(200)
        expect(json['pattern']).to eq(serialized_pattern(pattern))
      end
    end

    context 'with invalid params' do
      it 'assigns the pattern as @pattern' do
        pattern = FactoryBot.create(:pattern)

        put :update, params: {
          id: pattern.id,
          account_id: pattern.account.id,
          pattern: FactoryBot.attributes_for(:pattern_invalid)
        }

        json = JSON.parse(response.body)
        expect(response.status).to eq(422)
        expect(json).to eq('match_text' => ["can't be blank"])
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested pattern' do
      pattern = FactoryBot.create(:pattern)

      expect do
        delete :destroy, params: { id: pattern.id, account_id: pattern.account.id }
      end.to change(Pattern, :count).by(-1)

      expect(response.status).to eq(204)
    end
  end

  def serialized_pattern(pattern)
    {
      'id' => pattern.id,
      'account_id' => pattern.account_id,
      'category_id' => pattern.category_id,
      'subcategory_id' => pattern.subcategory_id,
      'match_text' => pattern.match_text,
      'notes' => pattern.notes
    }
  end
end
