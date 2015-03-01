require 'rails_helper'
RSpec.describe SubcategoriesController, :type => :controller do
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

  describe 'GET show' do
    it 'redirects to category index' do
      subcategory = FactoryGirl.create(:subcategory)
      get :show, { :id => subcategory.to_param }, valid_session
      expect(response).to redirect_to(categories_url)
    end
  end

  describe 'GET new' do
    it 'assigns a new subcategory as @subcategory' do
      category = FactoryGirl.create(:category)
      get :new, { :category_id => category.id }, valid_session
      expect(assigns(:subcategory)).to be_a_new(Subcategory)
    end

    it 'assigns the current category to subcategory' do
      category = FactoryGirl.create(:category)
      get :new, { :category_id => category.id }, valid_session
      expect(assigns(:subcategory).category).to eq(category)
    end

    it 'renders the :new view' do
      category = FactoryGirl.create(:category)
      get :new, { :category_id => category.id }, valid_session
      expect(response).to render_template(:new)
    end

    it 'redirects to category index if category not specified' do
      get :new, {}, valid_session
      expect(response).to redirect_to(categories_url)
    end
  end

  describe 'GET edit' do
    it 'assigns the requested subcategory as @subcategory' do
      subcategory = FactoryGirl.create(:subcategory)
      get :edit, { :id => subcategory.to_param }, valid_session
      expect(assigns(:subcategory)).to eq(subcategory)
    end

    it 'renders the :edit view' do
      subcategory = FactoryGirl.create(:subcategory)
      get :edit, { :id => subcategory.to_param }, valid_session
      expect(response).to render_template(:edit)
    end
  end

  describe 'POST create' do
    context 'with valid params' do
      it 'creates a new Subcategory' do
        expect {
          post :create, { :subcategory => build_attributes(:subcategory) }, valid_session
        }.to change(Subcategory, :count).by(1)
      end

      it 'assigns a newly created subcategory as @subcategory' do
        post :create, { :subcategory => build_attributes(:subcategory) }, valid_session
        expect(assigns(:subcategory)).to be_a(Subcategory)
        expect(assigns(:subcategory)).to be_persisted
      end

      it 'redirects to the categories index' do
        post :create, { :subcategory => build_attributes(:subcategory) }, valid_session
        expect(response).to redirect_to(categories_url)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved subcategory as @subcategory' do
        post :create, { :subcategory => build_attributes(:subcategory_invalid) }, valid_session
        expect(assigns(:subcategory)).to be_a_new(Subcategory)
      end

      it 're-renders the new template' do
        post :create, { :subcategory => build_attributes(:subcategory_invalid) }, valid_session
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT update' do
    describe 'with valid params' do
      let(:new_attributes) {
        { :name => 'Update Name' }
      }

      it 'updates the requested subcategory' do
        subcategory = FactoryGirl.create(:subcategory)
        put :update, { :id => subcategory.to_param, :subcategory => new_attributes }, valid_session
        subcategory.reload
        expect(subcategory.name).to eq('Update Name')
      end

      it 'redirects to the categories_url' do
        subcategory = FactoryGirl.create(:subcategory)
        put :update, { :id => subcategory.to_param, :subcategory => new_attributes }, valid_session
        expect(response).to redirect_to(categories_url)
      end
    end

    describe 'with invalid params' do
      it 'assigns the subcategory as @subcategory' do
        subcategory = FactoryGirl.create(:subcategory)
        put :update, { :id => subcategory.to_param, :subcategory => { :name => nil } }, valid_session
        expect(assigns(:subcategory)).to eq(subcategory)
      end

      it 're-renders the edit template' do
        subcategory = FactoryGirl.create(:subcategory)
        put :update, { :id => subcategory.to_param, :subcategory => { :name => nil } }, valid_session
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested subcategory' do
      subcategory = FactoryGirl.create(:subcategory)
      expect {
        delete :destroy, { :id => subcategory.to_param }, valid_session
      }.to change(Subcategory, :count).by(-1)
    end

    it 'redirects to the subcategories list' do
      subcategory = FactoryGirl.create(:subcategory)
      delete :destroy, { :id => subcategory.to_param }, valid_session
      expect(response).to redirect_to(categories_url)
    end
  end
end
