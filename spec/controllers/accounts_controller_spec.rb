require 'rails_helper'

RSpec.describe AccountsController, :type => :controller do

  let(:valid_attributes) {
    FactoryGirl.attributes_for(:account)
  }

  let(:invalid_attributes) {
    FactoryGirl.attributes_for(:account_invalid)
  }

  let(:valid_session) { {} }

  describe "GET index" do
    it "returns a list of all accounts" do
      account = FactoryGirl.create(:account, starting_balance: 1000)
      get :index, {}, valid_session

      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['accounts'].length).to eq(1)
      expect(json['accounts'][0]).to eq(serialize_account(account)) 
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new Account" do
        expect {
          post :create, {:account => FactoryGirl.attributes_for(:account)}, valid_session
        }.to change(Account, :count).by(1)
      end

      it "sends the account" do
        post :create, {:account => FactoryGirl.attributes_for(:account)}, valid_session
        expect(response).to be_success

        account = Account.first

        json = JSON.parse(response.body)
        expect(json['account']).to eq(serialize_account(account)) 
      end
    end

    context "with invalid params" do
      it "does not save a new Account" do
        expect {
          post :create, {:account => FactoryGirl.attributes_for(:account_invalid)}, valid_session
        }.not_to change(Account, :count)
        expect(response.status).to eq(422)
      end
    end
  end

  describe "PUT update" do

    before :each do
      @account = FactoryGirl.create(:account)
    end

    context "with valid params" do

      it "updates the requested account" do
        put :update, {:id => @account.to_param, 
          :account => FactoryGirl.attributes_for(:account,
            name: "New Account2",
            bank: "New Bank2",
            starting_balance: 800,
            starting_date: "2014-02-02")}, valid_session

        expect(response).to be_success

        json = JSON.parse(response.body)
        @account.reload
        expect(json['account']).to eq(serialize_account(@account)) 
        expect(@account.name).to eq("New Account2")
        expect(@account.bank).to eq("New Bank2")
        expect(@account.starting_balance).to eq(800)
        expect(@account.starting_date).to eq(Date.parse("2014-02-02"))
      end
    end

    context "with invalid params" do
      it "assigns the account as @account" do
        expect {
          put :update, {:id => @account.to_param, :account => FactoryGirl.attributes_for(:account_invalid)}, valid_session
        }.not_to change{ @account.updated_at }
        expect(response.status).to eq(422)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested account" do
      account = FactoryGirl.create(:account)
      expect {
        delete :destroy, {:id => account.to_param}, valid_session
      }.to change(Account, :count).by(-1)
      expect(response).to be_success
    end
  end

  # describe "last_reconciliation" do

  #   context "never been reconciled" do
  #     before :each do
  #       @account = FactoryGirl.create(:account)
  #     end

  #     it "sets @last_date with last reconciled date" do
  #       xhr :post, :last_reconciliation, {:id => @account.to_param, :format => "js"}
  #       expect(assigns(:last_date)).to eq(@account.starting_date)
  #     end

  #     it "sets @last_balance with last reconciled balance" do
  #       xhr :post, :last_reconciliation, {:id => @account.to_param, :format => "js"}
  #       expect(assigns(:last_balance)).to eq(@account.starting_balance)
  #     end
  #   end

  #   context "has been reconciled" do
  #     before :each do
  #       @account = FactoryGirl.create(:account)
  #       @reconciliation = FactoryGirl.create(:reconciliation, account: @account)
  #     end

  #     it "sets @last_date with account starting date" do
  #       xhr :post, :last_reconciliation, {:id => @account.to_param, :format => "js"}
  #       expect(assigns(:last_date)).to eq(@reconciliation.statement_date)
  #     end

  #     it "sets @last_balance with account starting balance" do
  #       xhr :post, :last_reconciliation, {:id => @account.to_param, :format => "js"}
  #       expect(assigns(:last_balance)).to eq(@reconciliation.statement_balance)
  #     end
  #   end

  #   it "renders the last_reconciliation view" do
  #     account = FactoryGirl.create(:account)
  #     xhr :post, :last_reconciliation, {:id => account.to_param, :format => "js"}

  #     expect(response).to render_template("last_reconciliation")
  #   end

  # end

end
