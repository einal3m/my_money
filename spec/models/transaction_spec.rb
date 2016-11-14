require 'rails_helper'
require 'lib/date_range'
#
#  Transaction
#
#  id: int, primary key
#  date: date
#  fitid: string
#  memo: string
#  amount: decimal
#  account_id: int, foreign key
#  category_id: int, foreign key, ('I', 'E' or 'T')
#  subcategory_id: int foreign key
#
RSpec.describe Transaction, type: :model do
  it 'has a valid factory' do
    t = FactoryGirl.create(:transaction)

    expect(t).to be_valid
    expect(t).to be_a(Transaction)
  end

  describe 'validations' do
    it 'is invalid without a date' do
      expect(FactoryGirl.build(:transaction, date: nil)).not_to be_valid
    end

    it 'is invalid without an account' do
      expect(FactoryGirl.build(:transaction, account: nil)).not_to be_valid
    end

    it 'is invalid without an amount' do
      expect(FactoryGirl.build(:transaction, amount: nil)).not_to be_valid
    end

    it 'is invalid when amount is not a number' do
      expect(FactoryGirl.build(:transaction, amount: 'Amount')).not_to be_valid
    end

    it 'is invalid without a transaction type' do
      expect(FactoryGirl.build(:transaction, transaction_type: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      a = FactoryGirl.create(:account)
      expect(FactoryGirl.create(:transaction, account: a).account).to eq(a)
    end

    it 'belongs to category' do
      c = FactoryGirl.create(:category)
      expect(FactoryGirl.create(:transaction, category: c).category).to eq(c)
    end

    it 'belongs to subcategory' do
      s = FactoryGirl.create(:subcategory)
      expect(FactoryGirl.create(:transaction, subcategory: s).subcategory).to eq(s)
    end

    it 'belongs to reconciliation' do
      r = FactoryGirl.create(:reconciliation)
      expect(FactoryGirl.create(:transaction, reconciliation: r).reconciliation).to eq(r)
    end

    it 'belongs to bank statement' do
      bs = FactoryGirl.create(:bank_statement)
      expect(FactoryGirl.create(:transaction, bank_statement: bs).bank_statement).to eq(bs)
    end
  end

  describe 'scopes' do
    it 'finds unreconciled transactions' do
      r = FactoryGirl.create(:reconciliation)
      FactoryGirl.create(:transaction)
      FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)
      FactoryGirl.create(:transaction, account: r.account, reconciliation: nil)

      expect(Transaction.unreconciled(r.account).length).to eq(2)
    end

    it 'orders transactions by date, then id' do
      t1 = FactoryGirl.create(:transaction, date: '2014-01-01')
      t2 = FactoryGirl.create(:transaction, date: '2014-01-02')
      t3 = FactoryGirl.create(:transaction, date: '2014-01-03')
      t4 = FactoryGirl.create(:transaction, date: '2014-01-01')
      t5 = FactoryGirl.create(:transaction, date: '2014-01-02')

      expect(Transaction.date_order).to eq([t1, t4, t2, t5, t3])
    end

    it 'orders transactions in reverse' do
      t1 = FactoryGirl.create(:transaction, date: '2014-01-01')
      t2 = FactoryGirl.create(:transaction, date: '2014-01-02')
      t3 = FactoryGirl.create(:transaction, date: '2014-01-03')
      t4 = FactoryGirl.create(:transaction, date: '2014-01-01')
      t5 = FactoryGirl.create(:transaction, date: '2014-01-02')

      expect(Transaction.reverse_date_order).to eq([t3, t5, t2, t4, t1])
    end

    it 'finds transactions given a date range object' do
      FactoryGirl.create(:transaction, date: '2014-01-01')
      t2 = FactoryGirl.create(:transaction, date: '2014-01-03')
      FactoryGirl.create(:transaction, date: '2014-01-05')
      t4 = FactoryGirl.create(:transaction, date: '2014-01-02')
      t5 = FactoryGirl.create(:transaction, date: '2014-01-04')
      dr = Lib::CustomDateRange.new(from_date: '2014-01-02', to_date: '2014-01-04')

      expect(Transaction.find_by_date(dr)).to eq([t2, t4, t5])
    end

    it 'finds transactions given two dates' do
      FactoryGirl.create(:transaction, date: '2014-01-01')
      t2 = FactoryGirl.create(:transaction, date: '2014-01-03')
      FactoryGirl.create(:transaction, date: '2014-01-05')
      t4 = FactoryGirl.create(:transaction, date: '2014-01-02')
      t5 = FactoryGirl.create(:transaction, date: '2014-01-04')

      expect(Transaction.find_by_dates('2014-01-02', '2014-01-04')).to eq([t2, t4, t5])
    end

    it 'finds transactions given an account type' do
      @share_account = FactoryGirl.create(:account, account_type: AccountType::Share)
      FactoryGirl.create(:transaction)
      t1 = FactoryGirl.create(:transaction, account: @share_account)

      expect(Transaction.for_account_type(AccountType::Share)).to eq([t1])
    end

    it 'finds transactions for banking type accounts' do
      @share_account = FactoryGirl.create(:account, account_type: AccountType::Share)
      @loan_account = FactoryGirl.create(:account, account_type: AccountType::Loan)
      @savings_account = FactoryGirl.create(:account, account_type: AccountType::Savings)
      FactoryGirl.create(:transaction, account: @share_account)
      t2 = FactoryGirl.create(:transaction, account: @loan_account)
      t3 = FactoryGirl.create(:transaction, account: @savings_account)

      expect(Transaction.for_banking_accounts).to eq([t2, t3])
    end

    it 'finds transactions with given string in notes or memo' do
      FactoryGirl.create(:transaction, notes: 'anything', memo: '')
      t2 = FactoryGirl.create(:transaction, notes: 'for Mel', memo: 'melanie')
      FactoryGirl.create(:transaction, notes: 'another thing', memo: '')
      t4 = FactoryGirl.create(:transaction, notes: 'blah', memo: 'Mel')
      t5 = FactoryGirl.create(:transaction, notes: 'melanie', memo: 'anything')

      expect(Transaction.find_by_description('mel')).to eq([t2, t4, t5])
    end
  end

  describe 'initialize' do
    it 'sets add to reconciliation to false' do
      expect(FactoryGirl.create(:transaction).add_to_reconciliation).to eq(false)
    end
  end

  describe 'callbacks' do
    before :each do
      account = FactoryGirl.create(:account, starting_balance: 11_010, starting_date: '2014-08-19')
      @transaction1 = FactoryGirl.create(:transaction, account: account, date: '2014-08-23', amount: 5520)
      @transaction2 = FactoryGirl.create(:transaction, account: account, date: '2014-08-21', amount: 2225)
      @transaction3 = FactoryGirl.create(:transaction, account: account, date: '2014-08-24', amount: 3333)
      @transaction4 = FactoryGirl.create(:transaction, account: account, date: '2014-08-23', amount: 4444)
      @transaction5 = FactoryGirl.create(:transaction, account: account, date: '2014-08-23', amount: 1000)
    end

    describe 'before create' do
      it 'sets the balance of the new transaction and updates later ones' do
        @transaction1.reload
        @transaction2.reload
        @transaction3.reload
        @transaction4.reload
        @transaction5.reload

        expect(@transaction2.balance).to eq(13_235)
        expect(@transaction1.balance).to eq(18_755)
        expect(@transaction4.balance).to eq(23_199)
        expect(@transaction5.balance).to eq(24_199)
        expect(@transaction3.balance).to eq(27_532)
      end
    end

    describe 'before update' do
      it 'updates the balances when amount is changed' do
        @transaction4.update(amount: 3444)

        @transaction1.reload
        @transaction2.reload
        @transaction3.reload
        @transaction4.reload
        @transaction5.reload

        expect(@transaction2.balance).to eq(13_235)
        expect(@transaction1.balance).to eq(18_755)
        expect(@transaction4.balance).to eq(22_199)
        expect(@transaction5.balance).to eq(23_199)
        expect(@transaction3.balance).to eq(26_532)
      end

      it 'updates the balances when date is changed to an earlier date' do
        @transaction4.update(date: '2014-08-19')

        @transaction1.reload
        @transaction2.reload
        @transaction3.reload
        @transaction4.reload
        @transaction5.reload

        expect(@transaction4.balance).to eq(15_454)
        expect(@transaction2.balance).to eq(17_679)
        expect(@transaction1.balance).to eq(23_199)
        expect(@transaction5.balance).to eq(24_199)
        expect(@transaction3.balance).to eq(27_532)
      end
      it 'updates the balances when date is changed to a later date' do
        @transaction1.update(date: '2014-08-25')

        @transaction1.reload
        @transaction2.reload
        @transaction3.reload
        @transaction4.reload
        @transaction5.reload

        expect(@transaction2.balance).to eq(13_235)
        expect(@transaction4.balance).to eq(17_679)
        expect(@transaction5.balance).to eq(18_679)
        expect(@transaction3.balance).to eq(22_012)
        expect(@transaction1.balance).to eq(27_532)
      end

      it 'doesnt change the balances when attribute other than date or amount is changed' do
        @transaction4.update(memo: 'New Memo')
        @transaction1.reload
        @transaction2.reload
        @transaction3.reload
        @transaction4.reload
        @transaction5.reload

        expect(@transaction2.balance).to eq(13_235)
        expect(@transaction1.balance).to eq(18_755)
        expect(@transaction4.balance).to eq(23_199)
        expect(@transaction5.balance).to eq(24_199)
        expect(@transaction3.balance).to eq(27_532)
        expect(@transaction4.memo).to eq('New Memo')
      end
    end

    describe 'after destroy' do
      it 'updates balances when transaction is deleted' do
        @transaction4.destroy
        @transaction1.reload
        @transaction2.reload
        @transaction3.reload
        @transaction5.reload

        expect(@transaction2.balance).to eq(13_235)
        expect(@transaction1.balance).to eq(18_755)
        expect(@transaction5.balance).to eq(19_755)
        expect(@transaction3.balance).to eq(23_088)
      end
    end
  end
end
