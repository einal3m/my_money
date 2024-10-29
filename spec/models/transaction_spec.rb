# frozen_string_literal: true

require 'rails_helper'
require_relative '../../app/models/lib/date_range'
#
#  Transaction
#
#  id: int, primary key
#  date: date
#  fitid: string
#  memo: string
#  amount: decimal
#  account_id: int, foreign key
#  category_id: int, foreign key
#  subcategory_id: int foreign key
#  matching_transaction_id: int foreign key (self)
#
RSpec.describe Transaction do
  it 'has a valid factory' do
    t = FactoryBot.create(:transaction)

    expect(t).to be_valid
    expect(t).to be_a(described_class)
  end

  describe 'validations' do
    it 'is invalid without a date' do
      expect(FactoryBot.build(:transaction, date: nil)).not_to be_valid
    end

    it 'is invalid without an account' do
      expect(FactoryBot.build(:transaction, account: nil)).not_to be_valid
    end

    it 'is invalid without an amount' do
      expect(FactoryBot.build(:transaction, amount: nil)).not_to be_valid
    end

    it 'is invalid when amount is not a number' do
      expect(FactoryBot.build(:transaction, amount: 'Amount')).not_to be_valid
    end

    it 'is invalid without a transaction type' do
      expect(FactoryBot.build(:transaction, transaction_type: nil)).not_to be_valid
    end

    it 'is invalid with subcategory without category' do
      expect(FactoryBot.build(:transaction, subcategory_id: 1)).not_to be_valid
    end

    it 'is invalid if matching_transaction is in same account' do
      matching_txn = FactoryBot.create(:transaction, amount: 111)
      expect(
        FactoryBot.build(
          :transaction,
          amount: -111,
          matching_transaction_id: matching_txn.id
        )
      ).to be_valid
      expect(
        FactoryBot.build(
          :transaction,
          account_id: matching_txn.account_id,
          amount: -111,
          matching_transaction_id: matching_txn.id
        )
      ).not_to be_valid
    end

    [
      { days: -3, valid: false },
      { days: -2, valid: true },
      { days: -1, valid: true },
      { days: 0, valid: true },
      { days: 1, valid: true },
      { days: 2, valid: true },
      { days: 3, valid: false }
    ].each do |test|
      it "is #{test[:valid] ? '' : 'in'}valid if the matching transaction is #{test[:days]} from txn date" do
        matching_txn = FactoryBot.create(:transaction, date: '2016-12-19', amount: 111)
        txn = FactoryBot.build(
          :transaction,
          date: matching_txn.date + (test[:days]).days,
          amount: -111,
          matching_transaction_id: matching_txn.id
        )

        if test[:valid]
          expect(txn).to be_valid
        else
          expect(txn).not_to be_valid
        end
      end
    end

    it 'is invalid if the matching transaction has a different amount' do
      matching_txn = FactoryBot.create(:transaction, date: '2016-12-19', amount: 111)
      expect(
        FactoryBot.build(
          :transaction,
          date: '2016-12-19',
          amount: -111,
          matching_transaction_id: matching_txn.id
        )
      ).to be_valid
      expect(
        FactoryBot.build(
          :transaction,
          date: '2016-12-19',
          amount: -1111,
          matching_transaction_id: matching_txn.id
        )
      ).not_to be_valid
    end

    it 'is invalid if the matching transaction is already matched' do
      matching_txn = FactoryBot.create(:transaction, date: '2016-12-19', amount: 111)
      FactoryBot.create(:transaction, date: '2016-12-19', amount: -111, matching_transaction_id: matching_txn.id)

      expect(
        FactoryBot.build(
          :transaction,
          date: '2016-12-19',
          amount: -111,
          matching_transaction_id: matching_txn.id
        )
      ).not_to be_valid
    end

    it 'is invalid if both matching transaction and category are set' do
      matching_txn = FactoryBot.create(:transaction, date: '2016-12-19', amount: 111)

      expect(
        FactoryBot.build(
          :transaction,
          date: '2016-12-19',
          amount: -111,
          matching_transaction_id: matching_txn.id,
          category_id: 1
        )
      ).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      a = FactoryBot.create(:account)
      expect(FactoryBot.create(:transaction, account: a).account).to eq(a)
    end

    it 'belongs to category' do
      c = FactoryBot.create(:category)
      expect(FactoryBot.create(:transaction, category: c).category).to eq(c)
    end

    it 'belongs to subcategory' do
      s = FactoryBot.create(:subcategory)
      expect(FactoryBot.create(:transaction, category: s.category, subcategory: s).subcategory).to eq(s)
    end

    it 'belongs to reconciliation' do
      r = FactoryBot.create(:reconciliation)
      expect(FactoryBot.create(:transaction, reconciliation: r).reconciliation).to eq(r)
    end

    it 'belongs to bank statement' do
      bs = FactoryBot.create(:bank_statement)
      expect(FactoryBot.create(:transaction, bank_statement: bs).bank_statement).to eq(bs)
    end

    it 'has one matching transaction' do
      matching_txn = FactoryBot.create(:transaction, amount: 111)
      matched_txn = FactoryBot.create(:transaction, matching_transaction: matching_txn, amount: -111)
      expect(matched_txn.matching_transaction).to eq(matching_txn)
    end
  end

  describe 'scopes' do
    it 'finds unreconciled transactions' do
      r = FactoryBot.create(:reconciliation)
      FactoryBot.create(:transaction)
      FactoryBot.create(:transaction, account: r.account, reconciliation: nil)
      FactoryBot.create(:transaction, account: r.account, reconciliation: nil)

      expect(described_class.unreconciled(r.account).length).to eq(2)
    end

    it 'orders transactions by date, then id' do
      t1 = FactoryBot.create(:transaction, date: '2014-01-01')
      t2 = FactoryBot.create(:transaction, date: '2014-01-02')
      t3 = FactoryBot.create(:transaction, date: '2014-01-03')
      t4 = FactoryBot.create(:transaction, date: '2014-01-01')
      t5 = FactoryBot.create(:transaction, date: '2014-01-02')

      expect(described_class.date_order).to eq([t1, t4, t2, t5, t3])
    end

    it 'orders transactions in reverse' do
      t1 = FactoryBot.create(:transaction, date: '2014-01-01')
      t2 = FactoryBot.create(:transaction, date: '2014-01-02')
      t3 = FactoryBot.create(:transaction, date: '2014-01-03')
      t4 = FactoryBot.create(:transaction, date: '2014-01-01')
      t5 = FactoryBot.create(:transaction, date: '2014-01-02')

      expect(described_class.reverse_date_order).to eq([t3, t5, t2, t4, t1])
    end

    it 'finds transactions given a date range object' do
      FactoryBot.create(:transaction, date: '2014-01-01')
      t2 = FactoryBot.create(:transaction, date: '2014-01-03')
      FactoryBot.create(:transaction, date: '2014-01-05')
      t4 = FactoryBot.create(:transaction, date: '2014-01-02')
      t5 = FactoryBot.create(:transaction, date: '2014-01-04')
      dr = Lib::CustomDateRange.new(from_date: '2014-01-02', to_date: '2014-01-04')

      expect(described_class.search_by_date(dr)).to eq([t2, t4, t5])
    end

    it 'finds transactions given two dates' do
      FactoryBot.create(:transaction, date: '2014-01-01')
      t2 = FactoryBot.create(:transaction, date: '2014-01-03')
      FactoryBot.create(:transaction, date: '2014-01-05')
      t4 = FactoryBot.create(:transaction, date: '2014-01-02')
      t5 = FactoryBot.create(:transaction, date: '2014-01-04')

      expect(described_class.search_by_dates('2014-01-02', '2014-01-04')).to eq([t2, t4, t5])
    end

    it 'finds transactions given an account type' do
      share_account = FactoryBot.create(:account, account_type: AccountType::Share)
      FactoryBot.create(:transaction)
      t1 = FactoryBot.create(:transaction, account: share_account)

      expect(described_class.for_account_type(AccountType::Share)).to eq([t1])
    end

    it 'finds transactions for banking type accounts' do
      share_account = FactoryBot.create(:account, account_type: AccountType::Share)
      loan_account = FactoryBot.create(:account, account_type: AccountType::Loan)
      savings_account = FactoryBot.create(:account, account_type: AccountType::Savings)
      FactoryBot.create(:transaction, account: share_account)
      t2 = FactoryBot.create(:transaction, account: loan_account)
      t3 = FactoryBot.create(:transaction, account: savings_account)

      expect(described_class.for_banking_accounts).to eq([t2, t3])
    end

    it 'finds transactions with given string in notes or memo' do
      FactoryBot.create(:transaction, notes: 'anything', memo: '')
      t2 = FactoryBot.create(:transaction, notes: 'for Mel', memo: 'melanie')
      FactoryBot.create(:transaction, notes: 'another thing', memo: '')
      t4 = FactoryBot.create(:transaction, notes: 'blah', memo: 'Mel')
      t5 = FactoryBot.create(:transaction, notes: 'melanie', memo: 'anything')

      expect(described_class.search_by_description('mel')).to eq([t2, t4, t5])
    end

    it 'finds transactions from other accounts which match given params, and are unmatched' do
      a1 = FactoryBot.create(:account)
      a2 = FactoryBot.create(:account)

      date = Date.parse('2014-07-01')
      amount = 333

      FactoryBot.create(:transaction, account: a1, date:, amount:)
      t1 = FactoryBot.create(:transaction, account: a2, date:, amount: -amount)
      t2 = FactoryBot.create(:transaction, account: a2, date:, amount: -amount)
      FactoryBot.create(:transaction, account: a1, date:, amount:, matching_transaction_id: t2.id)
      FactoryBot.create(:transaction, account: a2, date:, amount:)
      FactoryBot.create(:transaction, account: a1, date:, amount: -amount)
      FactoryBot.create(:transaction, account: a2, date: '2015-07-01', amount: -amount)
      FactoryBot.create(:transaction, account: a2, date:, amount: 444)
      t6 = FactoryBot.create(:transaction, account: a2, date:, amount: -amount)
      t7 = FactoryBot.create(:transaction, account: a2, date: date + 2.days, amount: -amount)
      t8 = FactoryBot.create(:transaction, account: a2, date: date - 2.days, amount: -amount)
      FactoryBot.create(:transaction, account: a2, date: date + 3.days, amount: -amount)
      FactoryBot.create(:transaction, account: a2, date: date - 3.days, amount: -amount)

      expect(described_class.find_matching(date, amount, a1)).to eq([t1, t6, t7, t8])
    end
  end

  describe 'initialize' do
    it 'sets add to reconciliation to false' do
      expect(FactoryBot.create(:transaction).add_to_reconciliation).to be(false)
    end
  end

  describe 'matching transaction callbacks' do
    it 'on create sets the other transactions matching id' do
      transaction1 = FactoryBot.create(:transaction, amount: 11)
      transaction2 = FactoryBot.create(:transaction, amount: -11, matching_transaction_id: transaction1.id)

      transaction1.reload
      transaction2.reload

      expect(transaction1.matching_transaction_id).to eq(transaction2.id)
      expect(transaction2.matching_transaction_id).to eq(transaction1.id)
    end

    it 'on update sets the other transactions matching id' do
      transaction1 = FactoryBot.create(:transaction, amount: 11)
      transaction2 = FactoryBot.create(:transaction, amount: -11)

      transaction1.update(matching_transaction_id: transaction2.id)

      transaction1.reload
      transaction2.reload

      expect(transaction1.matching_transaction_id).to eq(transaction2.id)
      expect(transaction2.matching_transaction_id).to eq(transaction1.id)
    end

    it 'on update resets old matching transaction to nil' do
      transaction1 = FactoryBot.create(:transaction, amount: 11)
      transaction2 = FactoryBot.create(:transaction, amount: -11, matching_transaction_id: transaction1.id)

      transaction1.reload
      transaction2.reload

      expect(transaction1.matching_transaction_id).to eq(transaction2.id)
      expect(transaction2.matching_transaction_id).to eq(transaction1.id)

      transaction2.update(matching_transaction_id: nil)

      transaction1.reload
      transaction2.reload

      expect(transaction1.matching_transaction_id).to be_nil
      expect(transaction2.matching_transaction_id).to be_nil
    end
  end

  describe 'balance callbacks' do
    def setup_txns
      account = FactoryBot.create(:account, starting_balance: 11_010, starting_date: '2014-08-19')
      transaction1 = FactoryBot.create(:transaction, account:, date: '2014-08-23', amount: 5520)
      transaction2 = FactoryBot.create(:transaction, account:, date: '2014-08-21', amount: 2225)
      transaction3 = FactoryBot.create(:transaction, account:, date: '2014-08-24', amount: 3333)
      transaction4 = FactoryBot.create(:transaction, account:, date: '2014-08-23', amount: 4444)
      transaction5 = FactoryBot.create(:transaction, account:, date: '2014-08-23', amount: 1000)

      [transaction1, transaction2, transaction3, transaction4, transaction5]
    end

    describe 'before create' do
      it 'sets the balance of the new transaction and updates later ones' do
        transaction1, transaction2, transaction3, transaction4, transaction5 = setup_txns

        transaction1.reload
        transaction2.reload
        transaction3.reload
        transaction4.reload
        transaction5.reload

        expect(transaction2.balance).to eq(13_235)
        expect(transaction1.balance).to eq(18_755)
        expect(transaction4.balance).to eq(23_199)
        expect(transaction5.balance).to eq(24_199)
        expect(transaction3.balance).to eq(27_532)
      end
    end

    describe 'before update' do
      it 'updates the balances when amount is changed' do
        transaction1, transaction2, transaction3, transaction4, transaction5 = setup_txns

        transaction4.update(amount: 3444)

        transaction1.reload
        transaction2.reload
        transaction3.reload
        transaction4.reload
        transaction5.reload

        expect(transaction2.balance).to eq(13_235)
        expect(transaction1.balance).to eq(18_755)
        expect(transaction4.balance).to eq(22_199)
        expect(transaction5.balance).to eq(23_199)
        expect(transaction3.balance).to eq(26_532)
      end

      it 'updates the balances when date is changed to an earlier date' do
        transaction1, transaction2, transaction3, transaction4, transaction5 = setup_txns
        transaction4.update(date: '2014-08-19')

        transaction1.reload
        transaction2.reload
        transaction3.reload
        transaction4.reload
        transaction5.reload

        expect(transaction4.balance).to eq(15_454)
        expect(transaction2.balance).to eq(17_679)
        expect(transaction1.balance).to eq(23_199)
        expect(transaction5.balance).to eq(24_199)
        expect(transaction3.balance).to eq(27_532)
      end

      it 'updates the balances when date is changed to a later date' do
        transaction1, transaction2, transaction3, transaction4, transaction5 = setup_txns
        transaction1.update(date: '2014-08-25')

        transaction1.reload
        transaction2.reload
        transaction3.reload
        transaction4.reload
        transaction5.reload

        expect(transaction2.balance).to eq(13_235)
        expect(transaction4.balance).to eq(17_679)
        expect(transaction5.balance).to eq(18_679)
        expect(transaction3.balance).to eq(22_012)
        expect(transaction1.balance).to eq(27_532)
      end

      it 'doesnt change the balances when attribute other than date or amount is changed' do
        transaction1, transaction2, transaction3, transaction4, transaction5 = setup_txns
        transaction4.update(memo: 'New Memo')

        transaction1.reload
        transaction2.reload
        transaction3.reload
        transaction4.reload
        transaction5.reload

        expect(transaction2.balance).to eq(13_235)
        expect(transaction1.balance).to eq(18_755)
        expect(transaction4.balance).to eq(23_199)
        expect(transaction5.balance).to eq(24_199)
        expect(transaction3.balance).to eq(27_532)
        expect(transaction4.memo).to eq('New Memo')
      end
    end

    describe 'after destroy' do
      it 'updates balances when transaction is deleted' do
        transaction1, transaction2, transaction3, transaction4, transaction5 = setup_txns
        transaction4.destroy

        transaction1.reload
        transaction2.reload
        transaction3.reload
        transaction5.reload

        expect(transaction2.balance).to eq(13_235)
        expect(transaction1.balance).to eq(18_755)
        expect(transaction5.balance).to eq(19_755)
        expect(transaction3.balance).to eq(23_088)
      end
    end
  end
end
