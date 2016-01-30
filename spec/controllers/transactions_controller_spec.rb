require 'rails_helper'

RSpec.describe TransactionsController, type: :controller do
  let(:valid_session) { {} }

  describe 'GET index' do
    it 'returns all transactions for specified account for specified date' do
      t1 = FactoryGirl.create(:transaction, date: '2014-07-03')
      t2 = FactoryGirl.create(:transaction, account: t1.account, date: '2014-07-09')
      FactoryGirl.create(:transaction, account: t1.account, date: '2014-07-21')
      FactoryGirl.create(:transaction, account: t1.account, date: '2014-06-30')
      get :index, { account_id: t1.account.id, from_date: '2014-07-01', to_date: '2014-07-10' }, valid_session

      expect(response).to be_success
      t1.reload
      t2.reload

      json = JSON.parse(response.body)
      expect(json['transactions'].length).to eq(2)
      expect(json['transactions'][0]).to eq(serialize_transaction(t2))
      expect(json['transactions'][1]).to eq(serialize_transaction(t1))
    end

    it 'returns all transactions for specified account for specified date and description' do
      t1 = FactoryGirl.create(:transaction, date: '2014-01-01')
      t2 = FactoryGirl.create(:transaction, account: t1.account, date: '2014-01-01', memo: 'melanie')
      t3 = FactoryGirl.create(:transaction, account: t1.account, date: '2014-01-01', notes: 'something')
      t4 = FactoryGirl.create(:transaction, account: t1.account, date: '2014-01-01', notes: 'for Mel')
      t5 = FactoryGirl.create(:transaction, account: t1.account, date: '2014-01-01', memo: 'melanie', notes: 'melanie')
      get :index, { account_id: t1.account.id, from_date: '2014-01-01', to_date: '2014-01-01', description: 'mel' }, valid_session

      expect(response).to be_success
      t1.reload
      t2.reload

      json = JSON.parse(response.body)
      expect(json['transactions'].length).to eq(3)
      expect(json['transactions'][0]['id']).to eq(t5.id)
      expect(json['transactions'][1]['id']).to eq(t4.id)
      expect(json['transactions'][2]['id']).to eq(t2.id)
    end
  end

  describe 'POST create one transaction' do
    context 'with valid params' do
      it 'creates a new Transaction' do
        a = FactoryGirl.create(:account)
        expect {
          post :create, { account_id: a.id, transaction: build_attributes(:transaction) }, valid_session
        }.to change(Transaction, :count).by(1)
      end

      it 'sends the transaction, with status success' do
        a = FactoryGirl.create(:account)
        post :create, { account_id: a.id, transaction: {
          account_id: a.id,
          transaction_type: 'bank_transaction',
          date: '1-Jan-2015',
          notes: 'This is a note',
          memo: 'This is a memo',
          unit_price: 50,
          quantity: 20,
          amount: 1000
        } }, valid_session
        expect(response.status).to eq(201)

        transaction = Transaction.first
        expect(transaction.transaction_type).to be_a(TransactionType::BankTransaction)
        expect(transaction.unit_price).to eq(50)
        expect(transaction.quantity).to eq(20)
        expect(transaction.amount).to eq(1000)
        expect(transaction.notes).to eq('This is a note')
        expect(transaction.memo).to eq('This is a memo')
        expect(transaction.date).to eq(Date.parse('1-Jan-2015'))

        json = JSON.parse(response.body)
        expect(json['transaction']).to eq(serialize_transaction(transaction))
      end
    end

    context 'with invalid params' do
      it 'does not create a new transaction' do
        a = FactoryGirl.create(:account)
        expect {
          post :create, { account_id: a.id, transaction: build_attributes(:transaction_invalid) }, valid_session
        }.not_to change(Transaction, :count)
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'POST create multiple transactions' do
    context 'with valid params' do
      it 'creates new Transactions' do
        a = FactoryGirl.create(:account)
        expect {
          post :create, { account_id: a.id, _json: [build_attributes(:transaction), build_attributes(:transaction)] }, valid_session
        }.to change(Transaction, :count).by(2)
      end
    end
  end

  describe 'PUT update' do
    context 'with valid params' do
      it 'updates the requested transaction' do
        new_subcategory = FactoryGirl.create(:subcategory)
        t = FactoryGirl.create(:transaction)

        new_attrs = {
          date: '2014-08-19',
          amount: 1011,
          memo: 'New memo',
          notes: 'New note',
          subcategory_id: new_subcategory.id,
          category_id: new_subcategory.category.id
        }

        put :update, { id: t.id, account_id: t.account_id, transaction: new_attrs }, valid_session

        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['transaction'].symbolize_keys).to include(new_attrs)
      end
    end

    context 'with invalid params' do
      it 'assigns the transaction as @transaction' do
        t = FactoryGirl.create(:transaction)
        put :update, { id: t.id, account_id: t.account_id, transaction: build_attributes(:transaction_invalid) }, valid_session
        expect(response.status).to eq(422)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'destroys the requested transaction' do
      t = FactoryGirl.create(:transaction)
      expect {
        delete :destroy, { id: t.id, account_id: t.account_id }, valid_session
      }.to change(Transaction, :count).by(-1)
      expect(response).to be_success
      expect(response.body).to eq('')
    end
    it 'doesnt destroy the transaction if it has been reconciled' do
      a = FactoryGirl.create(:account)
      r = FactoryGirl.create(:reconciliation, account: a)
      t = FactoryGirl.create(:transaction, reconciliation: r)
      expect {
        delete :destroy, { id: t.id, account_id: t.account_id }, valid_session
      }.not_to change(Transaction, :count)

      expect(response.status).to eq(422)
      json = JSON.parse(response.body)
      expect(json['message']).to eq('Cannot delete a transaction which has been reconciled')
    end
  end

  describe 'unreconciled' do
    it 'returns all unreconciled transactions' do
      a = FactoryGirl.create(:account)
      r = FactoryGirl.create(:reconciliation, account: a)

      FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)
      FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)
      FactoryGirl.create(:transaction, account: r.account, reconciliation: r)

      get :unreconciled, { account_id: a.id }, valid_session
      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json['transactions'].length).to eq(2)
    end
  end

  # ofx parses the OFX and returns a list of transactions
  describe 'ofx' do
    before :each do
      @account = FactoryGirl.create(:account)
      # @file = fixture_file_upload('test.ofx')
      @file = 'FILE'
      @memo = 'MEMO'
      @date = '2014-07-01'
      @amount = 333

      ofx_parser = double :ofx_parser
      transaction = ImportedTransaction.new(memo: @memo, date: @date, amount: @amount)

      expect(Lib::OfxParser).to receive(:new).with(@file).and_return(ofx_parser)
      expect(ofx_parser).to receive(:transactions).and_return([transaction])
    end

    it 'returns the transactions from the OFX file' do
      get :ofx, { account_id: @account.id, data_file: @file }, valid_session
      expect(response).to be_success
      json = JSON.parse(response.body)

      expect(json['transactions'].length).to eq(1)

      expect(json['transactions'][0]['memo']).to eq(@memo)
      expect(json['transactions'][0]['date']).to eq(@date)
      expect(json['transactions'][0]['amount']).to eq(@amount)
      expect(json['transactions'][0]['duplicate']).to be_falsey
      expect(json['transactions'][0]['import']).to be_truthy
    end

    it 'sets transactions to duplicate if they already exist' do
      FactoryGirl.create(:transaction, account: @account, memo: @memo, date: @date, amount: @amount)
      get :ofx, { account_id: @account.id, data_file: @file }, valid_session
      json = JSON.parse(response.body)
      expect(json['transactions'][0]['duplicate']).to be_truthy
      expect(json['transactions'][0]['import']).to be_falsey
    end

    it 'sets category and subcategory for transactions which match a pattern' do
      category = FactoryGirl.create(:category)
      subcategory = FactoryGirl.create(:subcategory, category: category)
      FactoryGirl.create(:pattern, account: @account, match_text: @memo, notes: 'New Note', category: category, subcategory: subcategory)

      get :ofx, { account_id: @account.id, data_file: @file }, valid_session
      json = JSON.parse(response.body)

      expect(json['transactions'][0]['category_id']).to eq(category.id)
      expect(json['transactions'][0]['subcategory_id']).to eq(subcategory.id)
      expect(json['transactions'][0]['notes']).to eq('New Note')
      expect(json['transactions'][0]['duplicate']).to be_falsey
      expect(json['transactions'][0]['import']).to be_truthy
    end
  end
end
