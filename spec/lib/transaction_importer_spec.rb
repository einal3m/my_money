require 'rails_helper'

describe 'TransactionImporter' do
  let (:account) { FactoryBot.create(:account) }
  let (:memo) { 'MEMO' }
  let (:date) { '2014-07-01' }
  let (:amount) { 333 }
  let (:file) { double 'file' }

  context 'ofx file' do
    before :each do
      ofx_parser = double :parser
      transaction = ImportedTransaction.new(memo: memo, date: date, amount: amount)

      expect(file).to receive(:original_filename).and_return('file.ofx')
      expect(Lib::OfxParser).to receive(:new).with(file).and_return(ofx_parser)
      expect(ofx_parser).to receive(:transactions).and_return([transaction])
    end

    it 'returns the parsed transactions' do
      transactions = Lib::TransactionImporter.new(account, file).execute

      expect(transactions.length).to eq(1)
      expect(transactions[0].memo).to eq(memo)
      expect(transactions[0].date).to eq(Date.parse(date))
      expect(transactions[0].amount).to eq(amount)
      expect(transactions[0].category_id).to eq(nil)
      expect(transactions[0].subcategory_id).to eq(nil)
      expect(transactions[0].duplicate).to be_falsey
      expect(transactions[0].import).to be_truthy
    end

    it 'sets the transactions to duplicate if they already exist' do
      FactoryBot.create(:transaction, account: account, memo: memo, date: date, amount: amount)
      transactions = Lib::TransactionImporter.new(account, file).execute

      expect(transactions.length).to eq(1)
      expect(transactions[0].duplicate).to be_truthy
      expect(transactions[0].import).to be_falsey
    end

    it 'does not set to duplicate if matching transaction in a different account' do
      FactoryBot.create(:transaction, memo: memo, date: date, amount: amount)
      transactions = Lib::TransactionImporter.new(account, file).execute

      expect(transactions.length).to eq(1)
      expect(transactions[0].duplicate).to be_falsey
      expect(transactions[0].import).to be_truthy
    end

    it 'sets category and subcategory for transactions which match a pattern' do
      category = FactoryBot.create(:category)
      subcategory = FactoryBot.create(:subcategory, category: category)
      FactoryBot.create(:pattern, account: account, match_text: memo, notes: 'New Note', category: category, subcategory: subcategory)

      transactions = Lib::TransactionImporter.new(account, file).execute

      expect(transactions.length).to eq(1)
      expect(transactions[0].memo).to eq(memo)
      expect(transactions[0].date).to eq(Date.parse(date))
      expect(transactions[0].amount).to eq(amount)
      expect(transactions[0].category_id).to eq(category.id)
      expect(transactions[0].subcategory_id).to eq(subcategory.id)
      expect(transactions[0].duplicate).to be_falsey
      expect(transactions[0].import).to be_truthy
    end
  end

  context 'csv file ' do
    it 'returns the parsed transactions' do
      csv_parser = double :parser
      transaction = ImportedTransaction.new(memo: memo, date: date, amount: amount)

      expect(file).to receive(:original_filename).and_return('file.csv')
      expect(Lib::CsvParser).to receive(:new).with(file).and_return(csv_parser)
      expect(csv_parser).to receive(:transactions).and_return([transaction])

      transactions = Lib::TransactionImporter.new(account, file).execute

      expect(transactions.length).to eq(1)
      expect(transactions[0].memo).to eq(memo)
      expect(transactions[0].date).to eq(Date.parse(date))
      expect(transactions[0].amount).to eq(amount)
      expect(transactions[0].duplicate).to be_falsey
      expect(transactions[0].import).to be_truthy
    end
  end
end
