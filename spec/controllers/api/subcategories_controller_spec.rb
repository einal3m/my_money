# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::SubcategoriesController do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns all subcategories' do
      category = FactoryBot.create(:category)
      subcategory = FactoryBot.create(:subcategory, category:)

      get :index

      expect(response).to have_http_status(:ok)

      json = response.parsed_body
      expect(json['subcategories'].length).to eq(1)
      expect(json['subcategories'][0]).to eq(serialized_subcategory(subcategory))
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      it 'creates a new Subcategory' do
        category = FactoryBot.create(:category)

        expect do
          post :create, params: { subcategory: FactoryBot.attributes_for(:subcategory, category_id: category.id) }
        end.to change(Subcategory, :count).by(1)

        expect(response).to have_http_status(:created)

        subcategory = Subcategory.first

        json = response.parsed_body
        expect(json['subcategory']).to eq(serialized_subcategory(subcategory))
      end
    end

    context 'with invalid params' do
      it 'does not create a new subcategory' do
        expect do
          post :create, params: { subcategory: FactoryBot.attributes_for(:subcategory, category_id: nil) }
        end.not_to change(Subcategory, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PUT update' do
    describe 'with valid params' do
      it 'updates the requested subcategory' do
        category = FactoryBot.create(:category)
        subcategory = FactoryBot.create(:subcategory, category:)

        put :update, params: { id: subcategory.id, subcategory: { name: 'Update Name' } }

        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json['subcategory']).to eq(
          'id' => subcategory.id,
          'category_id' => subcategory.category_id,
          'name' => 'Update Name'
        )
      end

      it 'updates transactions if category has changed' do
        category1 = FactoryBot.create(:category)
        category2 = FactoryBot.create(:category)
        subcategory = FactoryBot.create(:subcategory, category: category1)
        transaction = FactoryBot.create(:transaction, category: category1, subcategory:)

        put :update, params: { id: subcategory.id, subcategory: { category_id: category2.id } }

        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json['subcategory']).to eq(
          'id' => subcategory.id,
          'category_id' => category2.id,
          'name' => subcategory.name
        )

        transaction.reload
        expect(transaction.category).to eq(category2)
      end
    end

    describe 'with invalid params' do
      it 'does not update the subcategory' do
        category = FactoryBot.create(:category)
        subcategory = FactoryBot.create(:subcategory, category:)

        put :update, params: { id: subcategory.id, subcategory: { name: nil } }

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested subcategory' do
      category = FactoryBot.create(:category)
      subcategory = FactoryBot.create(:subcategory, category:)

      expect do
        delete :destroy, params: { id: subcategory.id }
      end.to change(Subcategory, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end

    it 'doesnt destroy the subcategory if it has errors' do
      category = FactoryBot.create(:category)
      subcategory = FactoryBot.create(:subcategory, category:)
      FactoryBot.create(:transaction, category:, subcategory:)

      expect do
        delete :destroy, params: { id: subcategory.id }
      end.not_to change(Subcategory, :count)

      expect(response).to have_http_status(:unprocessable_entity)

      json = response.parsed_body
      expect(json['message']).to eq('Cannot delete a subcategory that has been allocated to transactions')
    end
  end

  def serialized_subcategory(subcategory)
    {
      'id' => subcategory.id,
      'name' => subcategory.name,
      'category_id' => subcategory.category_id
    }
  end
end
