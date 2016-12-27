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

      json = JSON.parse(response.body, symbolize_names: true)
      expect(json[:transactions].length).to eq(2)
      expect(json[:transactions][0][:id]).to eq(t2.id)
      expect(json[:transactions][1][:id]).to eq(t1.id)
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
          post :create, { account_id: a.id, transaction: {
            account_id: a.id,
            transaction_type: 'bank_transaction',
            date: '1-Jan-2015',
            amount: 1000,
          } }, valid_session
        }.to change(Transaction, :count).by(1)
      end

      it 'sends the transaction, with status success' do
        a = FactoryGirl.create(:account)
        matched_txn = FactoryGirl.create(:transaction, date: '1-Jan-2015', amount: -1000)
        post :create, { account_id: a.id, transaction: {
          account_id: a.id,
          transaction_type: 'bank_transaction',
          date: '1-Jan-2015',
          notes: 'This is a note',
          memo: 'This is a memo',
          unit_price: 50,
          quantity: 20,
          amount: 1000,
          matching_transaction_id: matched_txn.id
        } }, valid_session
        expect(response.status).to eq(201)

        transaction = Transaction.second
        expect(transaction.transaction_type).to be_a(TransactionType::BankTransaction)
        expect(transaction.unit_price).to eq(50)
        expect(transaction.quantity).to eq(20)
        expect(transaction.amount).to eq(1000)
        expect(transaction.notes).to eq('This is a note')
        expect(transaction.memo).to eq('This is a memo')
        expect(transaction.date).to eq(Date.parse('1-Jan-2015'))
        expect(transaction.matching_transaction).to eq(matched_txn)

        response_txn = JSON.parse(response.body, symbolize_names: true)[:transaction]
        expect(response_txn).to include({
          id: transaction.id,
          transaction_type: 'bank_transaction',
          unit_price: 50,
          quantity: 20,
          amount: 1000,
          notes: 'This is a note',
          memo: 'This is a memo',
          date: '2015-01-01',
          matching_transaction: {
            id: matched_txn.id,
            account_id: matched_txn.account_id,
            notes: matched_txn.notes,
            memo: matched_txn.memo
          }
        })
      end
    end

    context 'with invalid params' do
      it 'does not create a new transaction' do
        a = FactoryGirl.create(:account)
        expect {
          post :create, { account_id: a.id, transaction: {
            account_id: a.id,
            transaction_type: 'bank_transaction',
            date: '1-Jan-2015'
          } }, valid_session
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

  describe 'import' do
    let (:file) { 'data_file' }
    let (:account) { FactoryGirl.create(:account) }
    let (:importer) { instance_double(Lib::TransactionImporter) }
    # let (:transaction) { instance_double(ImportedTransaction) }

    it 'calls the transaction importer' do
      expect(Lib::TransactionImporter).to receive(:new).with(account, file).and_return(importer)
      expect(importer).to receive(:execute).and_return({transactions: ['transaction']})

      get :import, { account_id: account.id, data_file: file }, valid_session

      expect(response).to be_success
      json = JSON.parse(response.body)

      expect(json['transactions'].length).to eq(1)
      expect(json['transactions'][0]).to eq('transaction')
    end
  end

  describe 'matching' do
    it 'returns transactions from other accounts which match given params' do
      a1 = FactoryGirl.create(:account)
      a2 = FactoryGirl.create(:account)

      date = '2014-07-01'
      amount = 333

      t0 = FactoryGirl.create(:transaction, account: a1, date: date, amount: amount)
      t1 = FactoryGirl.create(:transaction, account: a2, date: date, amount: -amount)
      FactoryGirl.create(:transaction, account: a2, date: date, amount: amount)
      FactoryGirl.create(:transaction, account: a1, date: date, amount: -amount)
      FactoryGirl.create(:transaction, account: a2, date: '2015-07-01', amount: -amount)
      FactoryGirl.create(:transaction, account: a2, date: date, amount: 444)
      t6 = FactoryGirl.create(:transaction, account: a2, date: date, amount: -amount)

      get :matching, { account_id: a1.id, id: t0.id }, valid_session
      expect(response).to be_success

      json = JSON.parse(response.body)
      expect(json['transactions'].length).to eq(2)
      expect(json['transactions'][0]['id']).to eq(t1.id)
      expect(json['transactions'][1]['id']).to eq(t6.id)
    end
  end
end
