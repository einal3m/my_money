require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do
  let(:valid_attributes) {
    FactoryGirl.attributes_for(:category)
  }

  let(:invalid_attributes) {
    FactoryGirl.attributes_for(:category_invalid)
  }

  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns a list of all categories' do
      category = FactoryGirl.create(:category)
      get :index, {}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['categories'].length).to eq(1)
      expect(json['categories'][0]).to eq(serialize_category(category))
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      it 'creates a new category' do
        expect {
          post :create, { category: build_attributes(:category) }, valid_session
        }.to change(Category, :count).by(1)

        expect(response).to be_success
        category = Category.first
        json = JSON.parse(response.body)
        expect(json['category']).to eq(serialize_category(category))
      end
    end

    context 'with invalid params' do
      it 'does not create a new category' do
        expect {
          post :create, { category: build_attributes(:category_invalid) }, valid_session
        }.not_to change(Category, :count)
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'PUT update' do
    context 'with valid params' do
      it 'updates the requested category' do
        category = FactoryGirl.create(:category)

        new_category_type = FactoryGirl.create(:category_type)
        put :update, {
          id: category.to_param,
          category: build_attributes(:category, name: 'New Name', category_type: new_category_type)
        }, valid_session

        expect(response).to be_success
        category.reload
        json = JSON.parse(response.body)
        expect(json['category']).to eq('id' => category.id, 'name' => 'New Name', 'category_type_id' => new_category_type.id)
      end
    end

    context 'with invalid params' do
      it 'returns an error' do
        category = FactoryGirl.create(:category)
        put :update, { id: category.id, category: build_attributes(:category_invalid) }, valid_session

        expect(response.status).to eq(422)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested category' do
      category = FactoryGirl.create(:category)
      expect {
        delete :destroy, { id: category.id }, valid_session
      }.to change(Category, :count).by(-1)
      expect(response).to be_success
    end

    it 'doesnt destroy the category if it has errors' do
      category = FactoryGirl.create(:category)
      FactoryGirl.create(:subcategory, category: category)
      expect {
        delete :destroy, { id: category.id }, valid_session
      }.not_to change(Category, :count)
      expect(response.status).to eq(422)
      json = JSON.parse(response.body)
      expect(json['subcategories'][0]).to eq('Category has subcategories')
    end
  end
end
