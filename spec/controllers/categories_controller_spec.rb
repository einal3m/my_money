# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do
  describe 'GET index' do
    it 'returns a list of all categories' do
      category = FactoryBot.create(:category)

      get :index

      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['categories'].length).to eq(1)
      expect(json['categories'][0]).to eq(serialized_category(category))
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      it 'creates a new category' do
        category_type = FactoryBot.create(:category_type)

        expect do
          post :create, params: { category: FactoryBot.attributes_for(:category, category_type_id: category_type.id) }
        end.to change(Category, :count).by(1)

        expect(response.status).to eq(201)
        category = Category.first
        json = JSON.parse(response.body)
        expect(json['category']).to eq(serialized_category(category))
      end
    end

    context 'with invalid params' do
      it 'does not create a new category' do
        expect do
          post :create, params: { category: FactoryBot.attributes_for(:category_invalid) }
        end.not_to change(Category, :count)

        expect(response.status).to eq(422)
      end
    end
  end

  describe 'PUT update' do
    context 'with valid params' do
      it 'updates the requested category' do
        category = FactoryBot.create(:category)

        put :update, params: {
          id: category.to_param,
          category: FactoryBot.attributes_for(:category, name: 'New Name')
        }

        expect(response.status).to eq(200)
        category.reload
        json = JSON.parse(response.body)
        expect(json['category']).to eq(
          'id' => category.id,
          'name' => 'New Name',
          'category_type_id' => category.category_type_id
        )
      end
    end

    context 'with invalid params' do
      it 'returns an error' do
        category = FactoryBot.create(:category)

        put :update, params: { id: category.id, category: FactoryBot.attributes_for(:category_invalid) }

        expect(response.status).to eq(422)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested category' do
      category = FactoryBot.create(:category)

      expect do
        delete :destroy, params: { id: category.id }
      end.to change(Category, :count).by(-1)

      expect(response.status).to eq(204)
    end

    it 'doesnt destroy the category if it has errors' do
      category = FactoryBot.create(:category)
      FactoryBot.create(:subcategory, category: category)

      expect do
        delete :destroy, params: { id: category.id }
      end.not_to change(Category, :count)

      expect(response.status).to eq(422)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Cannot delete a category that has subcategories')
    end
  end

  def serialized_category(category)
    {
      'id' => category.id,
      'category_type_id' => category.category_type_id,
      'name' => category.name
    }
  end
end
