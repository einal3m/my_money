require 'rails_helper'

RSpec.describe ImportTransactionsController, :type => :controller do

  # file_chooser displays a view to choose the OFX file and select an account
  describe "file_chooser" do
  	it "sets a list of accounts as @accounts" do
  	  account = FactoryGirl.create(:account)
  	  get :file_chooser
  	  expect(assigns(:accounts)).to eq([account])
  	end

  	it "sets @account to account set in the session" do
      account = FactoryGirl.create(:account)
  	  session[:account_id] = account.id
  	  get :file_chooser
  	  expect(assigns(:account)).to eq(account)
  	end

  	it "sets @account to account nil if it is not in the session" do
  	  get :file_chooser
  	  expect(assigns(:account)).to be_nil
  	end

  end

  # import parses the OFX and displays the list of transactions to the view
  describe "import" do
  	before :each do
      @account = FactoryGirl.create(:account)
  	  @file = fixture_file_upload('test.ofx')
  	end

  	it "assigns the current account to @account" do
  		post :import, {:account => @account.to_param, :money_file => @file}
  		expect(assigns(:account)).to eq(@account)
  	end

  	it "assigns the transactions in the OFX file to @transactions" do
  		post :import, {:account => @account.to_param, :money_file => @file}
  		transactions = assigns(:transactions)
		expect(transactions.length).to eq(4)   		

		expect(transactions[0].memo).to eq("VILLAGE CINEMA")
		expect(transactions[0].date).to eq(Date.parse("2014-07-05"))
		expect(transactions[0].amount).to eq(-55.00)

		expect(transactions[1].memo).to eq("COLES SUPERMARKETS")
		expect(transactions[1].date).to eq(Date.parse("2014-07-04"))
		expect(transactions[1].amount).to eq(-74.76)

		expect(transactions[2].memo).to eq("MCDONALDS")
		expect(transactions[2].date).to eq(Date.parse("2014-07-03"))
		expect(transactions[2].amount).to eq(-19.20)

		expect(transactions[3].memo).to eq("PAYMENT RECEIVED")
		expect(transactions[3].date).to eq(Date.parse("2014-07-03"))
		expect(transactions[3].amount).to eq(3266.10)

  	end

  	it "assigns a list of all categories to @categories" do
  		category = FactoryGirl.create(:category)
  		post :import, {:account => @account.to_param, :money_file => @file}
  		expect(assigns(:categories)).to eq([category])
  	end

  	it "sets transactions to duplicate if they already exist" do
  		FactoryGirl.create(:transaction, account: @account, memo: "COLES SUPERMARKETS", date: "2014-07-04", amount: -74.76)
  		post :import, {:account => @account.to_param, :money_file => @file}
		expect(assigns(:transactions)[1].duplicate).to be_truthy  		
  	end

  	it "sets category and subcategory for transactions which match a pattern" do
  		category = FactoryGirl.create(:category)
  		subcategory = FactoryGirl.create(:subcategory, category: category)
  		FactoryGirl.create(:pattern, account: @account, match_text: "MCDONALDS", category: category, subcategory: subcategory)

  		post :import, {:account => @account.to_param, :money_file => @file}
  		expect(assigns(:transactions)[2].category).to eq(category)
  		expect(assigns(:transactions)[2].subcategory).to eq(subcategory)
  	end
  end

end
