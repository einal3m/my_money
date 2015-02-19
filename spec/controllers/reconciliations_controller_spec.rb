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

    context "with transactions" do

      it "sets reconciled to true and updates transactions" do
        r = FactoryGirl.create(:reconciliation, reconciled: false)
        t = FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)
     
        put :update, {account_id: r.account_id, 
                      id: r.id, 
                      reconciled: true,
                      :transactions => [{id: t.id}]}

        r.reload
        t.reload

        expect(r.reconciled).to be_truthy
        expect(t.reconciliation).to eq(r)
      end
    end

    context "with invalid params" do
      it "returns an error code" do
        put :update, {:account_id => reconciliation.account_id, :id => reconciliation.id, 
          :reconciliation => build_attributes(:reconciliation_invalid)}, valid_session
        expect(response.status).to be(422)
      end
    end
  end
end
