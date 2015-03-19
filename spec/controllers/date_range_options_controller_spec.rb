require 'rails_helper'

RSpec.describe DateRangeOptionsController, type: :controller do
  let(:valid_attributes) {
    FactoryGirl.attributes_for(:date_range_option)
  }

  let(:invalid_attributes) {
    FactoryGirl.attributes_for(:date_range_option, klass: nil)
  }

  describe 'GET index' do
    it 'assigns all date_range_options as @date_range_options' do
      date_range_option = FactoryGirl.create(:date_range_option)
      get :index
      expect(assigns(:date_range_options)).to eq([date_range_option])
    end

    it 'assigns a new date_range_option as @date_range_option' do
      get :index
      expect(assigns(:date_range_option)).to be_a_new(DateRangeOption)
    end
  end

  describe 'GET edit' do
    it 'assigns the requested date_range_option as @date_range_option' do
      date_range_option = DateRangeOption.create! valid_attributes
      get :edit, id: date_range_option.id
      expect(assigns(:date_range_option)).to eq(date_range_option)
    end
  end

  describe 'POST create' do
    describe 'with valid params' do
      it 'creates a new DateRangeOption' do
        expect {
          post :create, date_range_option: valid_attributes
        }.to change(DateRangeOption, :count).by(1)
      end

      it 'redirects to the date_range_option index page' do
        post :create, date_range_option: valid_attributes
        expect(response).to redirect_to(date_range_options_url)
      end
    end

    describe 'with invalid params' do
      it 'assigns a newly created but unsaved date_range_option as @date_range_option' do
        post :create, date_range_option: invalid_attributes
        expect(assigns(:date_range_option)).to be_a_new(DateRangeOption)
      end

      it 'redirects to the date range option index page' do
        post :create, date_range_option: invalid_attributes
        expect(response).to redirect_to(date_range_options_url)
      end
    end
  end

  describe 'PUT update' do
    describe 'with valid params' do
      let(:new_attributes) {
        FactoryGirl.attributes_for(:date_range_option, description: 'Update Desc', klass: 'Lib::CustomDateRange', default: true)
      }

      it 'updates the requested date_range_option' do
        dro1 = DateRangeOption.create! valid_attributes
        date_range_option = DateRangeOption.create! valid_attributes
        put :update, id: date_range_option.to_param, date_range_option: new_attributes
        dro1.reload
        date_range_option.reload

        expect(date_range_option.description).to eq('Update Desc')
        expect(date_range_option.klass).to eq('Lib::CustomDateRange')
        expect(date_range_option.default).to be_truthy
        expect(dro1.default).to be_falsey
      end

      it 'redirects to the date_range_option index page' do
        date_range_option = DateRangeOption.create! valid_attributes
        put :update, id: date_range_option.to_param, date_range_option: valid_attributes
        expect(response).to redirect_to(date_range_options_url)
      end
    end

    describe 'with invalid params' do
      it 'assigns the date_range_option as @date_range_option' do
        date_range_option = DateRangeOption.create! valid_attributes
        put :update, id: date_range_option.to_param, date_range_option: invalid_attributes
        expect(assigns(:date_range_option)).to eq(date_range_option)
      end

      it "re-renders the 'edit' template" do
        date_range_option = DateRangeOption.create! valid_attributes
        put :update, id: date_range_option.to_param, date_range_option: invalid_attributes
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested date_range_option' do
      date_range_option = DateRangeOption.create! valid_attributes
      expect {
        delete :destroy, id: date_range_option.id
      }.to change(DateRangeOption, :count).by(-1)
    end

    it 'redirects to the date_range_options list' do
      date_range_option = DateRangeOption.create! valid_attributes
      delete :destroy, id: date_range_option.id
      expect(response).to redirect_to(date_range_options_url)
    end

    it 'removes date range option from session if deleted' do
      date_range_option = DateRangeOption.create! valid_attributes
      session[:date_range_option_id] = date_range_option.id
      delete :destroy, id: date_range_option.id

      expect(session[:date_range_option_id]).to be_nil
    end

    it 'leaves session unchanged if different date range option deleted' do
      date_range_option1 = DateRangeOption.create! valid_attributes
      date_range_option2 = DateRangeOption.create! valid_attributes
      session[:date_range_option_id] = date_range_option1.id
      delete :destroy, id: date_range_option2.id

      expect(session[:date_range_option_id]).to eq(date_range_option1.id)
    end
  end
end
