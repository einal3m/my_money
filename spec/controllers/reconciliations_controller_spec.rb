require 'rails_helper'

RSpec.describe ReconciliationsController, :type => :controller do

  let(:valid_attributes) {
    FactoryGirl.attributes_for(:reconciliation)
  }

  let(:invalid_attributes) {
    FactoryGirl.attributes_for(:reconciliation_invalid)
  }

  let(:valid_session) { {} }

  describe "GET index" do
    it "returns all reconciliations for the account" do
      reconciliation = FactoryGirl.create(:reconciliation)
      get :index, {account_id: reconciliation.account_id}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['reconciliations'].length).to eq(1)
      expect(json['reconciliations'][0]).to eq(serialize_reconciliation(reconciliation)) 
    end
  end

  describe "GET show" do
    it "returns the specified reconciliation" do
      reconciliation = FactoryGirl.create(:reconciliation)
      get :show, {account_id: reconciliation.account_id, id: reconciliation.id}, valid_session
      json = JSON.parse(response.body)
      expect(response).to be_success
      expect(json['reconciliation']).to eq(serialize_reconciliation(reconciliation))
    end
  end

  describe "POST create" do
    let(:account) { FactoryGirl.create(:account) }

    context "with valid params" do
      it "creates a new Reconciliation" do
        expect {
          post :create, {account_id: account, reconciliation: build_attributes(:reconciliation)}, valid_session
        }.to change(Reconciliation, :count).by(1)
      end

      it "returns the reconciliation" do
        post :create, {account_id: account, reconciliation: build_attributes(:reconciliation)}, valid_session
        expect(response).to be_success

        reconciliation = Reconciliation.first
        json = JSON.parse(response.body)
        expect(json['reconciliation']).to eq(serialize_reconciliation(reconciliation))
      end
    end

    context "with invalid params" do
      it "does not create a new reconciliation" do
        expect {
          post :create, {account_id: account, reconciliation: build_attributes(:reconciliation_invalid)}, valid_session
        }.not_to change(Reconciliation, :count)
        expect(response.status).to be(422)
      end
    end
  end

  describe "PUT update" do
    let(:reconciliation) { FactoryGirl.create(:reconciliation) }

    context "with valid params" do

      it "updates and returns the requested reconciliation" do
        put :update, {:account_id => reconciliation.account_id, :id => reconciliation.id, 
          :reconciliation => build_attributes(:reconciliation,
              statement_balance: "977",
              statement_date: "2014-07-02")}, valid_session
        reconciliation.reload
        expect(reconciliation.statement_date).to eq(Date.parse("2014-07-02"))
        expect(reconciliation.statement_balance).to eq(977)

        expect(response).to be_success
        json = JSON.parse(response.body)
        expect(json['reconciliation']).to eq(serialize_reconciliation(reconciliation))
      end
    end

    context "with invalid params" do
      it "assigns the reconciliation as @reconciliation" do
        put :update, {:account_id => reconciliation.account_id, :id => reconciliation.id, 
          :reconciliation => build_attributes(:reconciliation_invalid)}, valid_session
        expect(response.status).to be(422)
      end
    end
  end

  # describe "DELETE destroy" do
  #   before :each do
  #     @reconciliation = FactoryGirl.create(:reconciliation)
  #   end

  #   it "destroys the requested reconciliation" do
  #     expect {
  #       delete :destroy, {:id => @reconciliation.to_param}, valid_session
  #     }.to change(Reconciliation, :count).by(-1)
  #   end

  #   it "redirects to the reconciliations list" do
  #     delete :destroy, {:id => @reconciliation.to_param}, valid_session
  #     expect(response).to redirect_to(reconciliations_url)
  #   end
  # end

  # describe "reconcile" do
  #   before :each do
  #     @reconciliation = FactoryGirl.create(:reconciliation)
  #     @transaction1 = FactoryGirl.create(:transaction, account: @reconciliation.account, reconciliation: nil)
  #     @transaction2 = FactoryGirl.create(:transaction, account: @reconciliation.account, reconciliation: nil)
  #   end

  #   it "updates reconciliation reconciled" do
  #     get :reconcile, {:id => @reconciliation.to_param,
  #         :transactions => [{"id"=>@transaction1.id, "add_to_reconciliation"=>"1"},
  #                           {"id"=>@transaction2.id, "add_to_reconciliation"=>"0"}]}
  #     @reconciliation.reload

  #     expect(@reconciliation.reconciled).to be_truthy
  #   end

  #   it "updates reconciliation on transactions" do
  #     get :reconcile, {:id => @reconciliation.to_param,
  #           :transactions => [{"id"=>@transaction1.id, "add_to_reconciliation"=>"1"},
  #                           {"id"=>@transaction2.id, "add_to_reconciliation"=>"0"}]}
  #     @transaction1.reload
  #     @transaction2.reload
  #     @reconciliation.reload

  #     expect(@transaction1.reconciliation).to eq(@reconciliation)
  #     expect(@transaction2.reconciliation).to eq(nil)
  #   end

  #   it "redirects to the reconciliation show page" do
  #     get :reconcile, {:id => @reconciliation.to_param,
  #           :transactions => [{"id"=>@transaction1.id, "add_to_reconciliation"=>"1"},
  #                           {"id"=>@transaction2.id, "add_to_reconciliation"=>"0"}]}
  #     expect(response).to redirect_to(transactions_url)
  #   end

  # end
end
