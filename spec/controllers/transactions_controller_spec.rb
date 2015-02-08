require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe TransactionsController, :type => :controller do

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # TransactionsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  before :all do
    @dr_option = FactoryGirl.create(:date_range_option, description: "Current Month", klass: "CurrentMonthDateRange", default: true)
  end

  describe "GET index" do

    it "assigns all transactions for specified account for specified date range as @transactions" do
      t1 = FactoryGirl.create(:transaction, date: Date.today)
      t2 = FactoryGirl.create(:transaction, account: t1.account, date: Date.today >> 2)
      t3 = FactoryGirl.create(:transaction, account: t1.account, date: Date.today << 2)
      get :index, {:account_id => t1.account.id}, valid_session

      expect(assigns(:transactions)).to eq([t1])
    end

    it "returns no transactions if no account is specified or in the session" do
      session.delete(:account_id)
      FactoryGirl.create(:transaction, date: Date.today)
      get :index, {}, valid_session
      expect(assigns(:transactions)).to eq([])
    end

    it "saves the current account into the session and @account" do
      transaction = FactoryGirl.create(:transaction, date: Date.today)
      get :index, {:account_id => transaction.account.id}, valid_session
      expect(session[:account_id]).to eq(transaction.account.id.to_s)
      expect(assigns(:account)).to eq(transaction.account)
    end

    it "calculates the current balance" do
      transaction = FactoryGirl.create(:transaction, date: Date.today)
      get :index, {:account_id => transaction.account.id}, valid_session
      expect(assigns(:current_balance)).to eq(transaction.amount + transaction.account.starting_balance)
    end

    it "renders the :index view" do
      transaction = FactoryGirl.create(:transaction, date: Date.today)
      get :index, {:account_id => transaction.account.id}, valid_session
      expect(response).to render_template("index")
    end

  end

  describe "GET show" do
    it "redirects the the index page" do
      transaction = FactoryGirl.create(:transaction, date: Date.today)
      get :show, {:id => transaction.to_param}, valid_session
      expect(response).to redirect_to(transactions_url)
    end
  end

  describe "GET new" do
    it "assigns a new transaction as @transaction" do
      get :new, {}, valid_session
      expect(assigns(:transaction)).to be_a_new(Transaction)
    end

    it "sets the account the account in the session" do
      account = FactoryGirl.create(:account)
      session[:account_id] = account.id
      get :new, {}, valid_session
      expect(assigns(:transaction).account).to eq(account)
    end

    it "renders the :new view" do
      get :new, {}, valid_session
      expect(response).to render_template(:new)
    end
  end

  describe "GET edit" do
    it "assigns the requested transaction as @transaction" do
      transaction = FactoryGirl.create(:transaction)
      get :edit, {:id => transaction.to_param}, valid_session
      expect(assigns(:transaction)).to eq(transaction)
    end

    it "assigns lists for categories and subcategories" do
      subcategory = FactoryGirl.create(:subcategory)
      transaction = FactoryGirl.create(:transaction, category: subcategory.category, subcategory: subcategory)
      get :edit, {:id => transaction.to_param}, valid_session
      expect(assigns(:categories)).to eq([subcategory.category])
      expect(assigns(:subcategories)).to eq([subcategory])
    end

    it "renders the :edit view" do
      transaction = FactoryGirl.create(:transaction)
      get :edit, {:id => transaction.to_param}, valid_session
      expect(response).to render_template(:edit)
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new Transaction" do
        expect {
          post :create, {:transaction => build_attributes(:transaction)}, valid_session
        }.to change(Transaction, :count).by(1)
      end

      it "assigns a newly created transaction as @transaction" do
        post :create, {:transaction => build_attributes(:transaction)}, valid_session
        expect(assigns(:transaction)).to be_a(Transaction)
        expect(assigns(:transaction)).to be_persisted
      end

      it "redirects to the transactions index" do
        post :create, {:transaction => build_attributes(:transaction)}, valid_session
        expect(response).to redirect_to(transactions_url)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved transaction as @transaction" do
        post :create, {:transaction => build_attributes(:transaction_invalid)}, valid_session
        expect(assigns(:transaction)).to be_a_new(Transaction)
      end

      it "re-renders the 'new' template" do
        post :create, {:transaction => build_attributes(:transaction_invalid)}, valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested transaction" do
        new_subcategory = FactoryGirl.create(:subcategory)
        transaction = FactoryGirl.create(:transaction)
        session[:last_transaction_page] = transactions_url
        put :update, {:id => transaction.to_param, :transaction => {
              date: "2014-08-19",
              amount: 10.11,
              memo: "New memo",
              notes: "New note",
              subcategory_id: new_subcategory.id,
              category_id: new_subcategory.category.id}}, valid_session
        transaction.reload
        expect(assigns(:transaction).date).to eq(Date.parse("2014-08-19"))
        expect(assigns(:transaction).amount).to eq(10.11)
        expect(assigns(:transaction).memo).to eq("New memo")
        expect(assigns(:transaction).notes).to eq("New note")
        expect(assigns(:transaction).subcategory).to eq(new_subcategory)
        expect(assigns(:transaction).category).to eq(new_subcategory.category)
      end

      it "assigns the requested transaction as @transaction" do
        session[:last_transaction_page] = transactions_url
        transaction = FactoryGirl.create(:transaction)
        put :update, {:id => transaction.to_param, :transaction => build_attributes(:transaction)}, valid_session
        expect(assigns(:transaction)).to eq(transaction)
      end

      it "redirects to the transactions index" do
        session[:last_transaction_page] = transactions_url
        transaction = FactoryGirl.create(:transaction)
        put :update, {:id => transaction.to_param, :transaction => build_attributes(:transaction)}, valid_session
        expect(response).to redirect_to(transactions_url)
      end
    end

    context "with invalid params" do
      it "assigns the transaction as @transaction" do
        transaction = FactoryGirl.create(:transaction)
        put :update, {:id => transaction.to_param, :transaction => build_attributes(:transaction_invalid)}, valid_session
        expect(assigns(:transaction)).to eq(transaction)
      end

      it "re-renders the 'edit' template" do
        transaction = FactoryGirl.create(:transaction)
        put :update, {:id => transaction.to_param, :transaction => build_attributes(:transaction_invalid)}, valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested transaction" do
      transaction = FactoryGirl.create(:transaction)
      expect {
        delete :destroy, {:id => transaction.to_param}, valid_session
      }.to change(Transaction, :count).by(-1)
    end

    it "redirects to the transactions list" do
      transaction = FactoryGirl.create(:transaction)
      delete :destroy, {:id => transaction.to_param}, valid_session
      expect(response).to redirect_to(transactions_url)
    end
  end

  describe "import" do

    it "saves the transactions with import set to true" do
      account = FactoryGirl.create(:account)
      expect { post :import, {:account => {:id => account.id}, :import_transactions => [
        {:import => "1", :date => "2014-08-19", :amount => 8.15},
        {:import => "0", :date => "2014-08-20", :amount => 7.05}]}, valid_session
      }.to change(Transaction, :count).by(1)
      expect(response).to redirect_to(transactions_url)
    end

  end

  describe "unreconciled" do
    let(:reconciliation) { FactoryGirl.create(:reconciliation) }

    it "returns all unreconciled transactions" do

      transaction1 = FactoryGirl.create(:transaction, account: reconciliation.account, reconciliation: nil)
      transaction2 = FactoryGirl.create(:transaction, account: reconciliation.account, reconciliation: nil)
      transaction3 = FactoryGirl.create(:transaction, account: reconciliation.account)
    
      get :unreconciled, {account_id: reconciliation.account_id}, valid_session
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['transactions'].length).to eq(2)
    end
  end
end
