require 'rails_helper'
RSpec.describe SubcategoriesController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns all subcategories' do
      c = FactoryGirl.create(:category)
      s = FactoryGirl.create(:subcategory, category: c)

      get :index, {}, valid_session
      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['subcategories'].length).to eq(1)
      expect(json['subcategories'][0]).to eq(serialize_subcategory(s))
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      it 'creates a new Subcategory' do
        expect {
          post :create, { subcategory: build_attributes(:subcategory) }, valid_session
        }.to change(Subcategory, :count).by(1)

        expect(response).to be_success
        subcategory = Subcategory.first
        json = JSON.parse(response.body)
        expect(json['subcategory']).to eq(serialize_subcategory(subcategory))
      end
    end

    context 'with invalid params' do
      it 'does not create a new subcategory' do
        expect {
          post :create, { subcategory: build_attributes(:subcategory_invalid) }, valid_session
        }.not_to change(Subcategory, :count)

        expect(response.status).to eq(422)
      end
    end
  end

  describe 'PUT update' do
    describe 'with valid params' do
      let(:new_attributes) {
        { name: 'Update Name' }
      }

      it 'updates the requested subcategory' do
        subcategory = FactoryGirl.create(:subcategory)
        put :update, { id: subcategory.id, subcategory: new_attributes }, valid_session

        expect(response).to be_success
        json = JSON.parse(response.body)
        expect(json['subcategory']).to eq('id' => subcategory.id, 'category_id' => subcategory.category_id, 'name' => 'Update Name')
      end
    end

    describe 'with invalid params' do
      it 'does not update the subcategory' do
        subcategory = FactoryGirl.create(:subcategory)
        put :update, { id: subcategory.id, subcategory: { name: nil } }, valid_session
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested subcategory' do
      subcategory = FactoryGirl.create(:subcategory)
      expect {
        delete :destroy, { id: subcategory.id }, valid_session
      }.to change(Subcategory, :count).by(-1)
      expect(response).to be_success
    end

    it 'doesnt destroy the subcategory if it has transactions' do
      subcategory = FactoryGirl.create(:subcategory)
      FactoryGirl.create(:transaction, subcategory: subcategory)
      expect {
        delete :destroy, { id: subcategory.id }, valid_session
      }.not_to change(Subcategory, :count)
      expect(response.status).to eq(422)
      expect(response.body).to eq('Subcategory has transactions')
    end

    it 'doesnt destroy the subcategory if it has patterns' do
      subcategory = FactoryGirl.create(:subcategory)
      FactoryGirl.create(:pattern, subcategory: subcategory)
      expect {
        delete :destroy, { id: subcategory.id }, valid_session
      }.not_to change(Subcategory, :count)
      expect(response.status).to eq(422)
      expect(response.body).to eq('Subcategory has patterns')
    end
  end
end
