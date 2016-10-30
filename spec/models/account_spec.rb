require 'rails_helper'
#
#  Account
#
#  id: int, primary key
#  category_type_id: int, foreign key
#  name: string
#  bank: string
#  starting_balance: decimal
#
RSpec.describe Account, type: :model do
  it 'has a valid factory' do
    a = FactoryGirl.create(:account)

    expect(a).to be_valid
    expect(a).to be_a(Account)
  end

  describe 'defaults' do
    it 'to zero starting balance' do
      expect(Account.new.starting_balance).to eq(0)
    end
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryGirl.build(:account, name: nil)).not_to be_valid
    end

    it 'is invalid without an account type' do
      expect(FactoryGirl.build(:account, account_type: nil)).not_to be_valid
    end

    context 'savings' do
      it 'is invalid without a starting balance' do
        expect(FactoryGirl.build(:account, starting_balance: nil, account_type: 'savings')).not_to be_valid
      end

      it 'is invalid without a starting date' do
        expect(FactoryGirl.build(:account, starting_date: nil, account_type: 'savings')).not_to be_valid
      end

      it 'is invalid if starting balance is not a number' do
        expect(FactoryGirl.build(:account, starting_balance: 'a', account_type: 'savings')).not_to be_valid
      end
  
      it 'is valid without a ticker' do
        expect(FactoryGirl.build(:account, ticker: nil, account_type: 'savings')).to be_valid
      end
    end

    context 'shares' do
      it 'is invalid without a ticker' do
        expect(FactoryGirl.build(:account, ticker: nil, account_type: 'share')).not_to be_valid
      end
  
      it 'is valid without a starting_balance or starting_date' do
        expect(FactoryGirl.build(:account, starting_balance: nil, account_type: 'share')).to be_valid
        expect(FactoryGirl.build(:account, starting_date: nil, account_type: 'share')).to be_valid
      end
    end

    context 'loan' do
      it 'is invalid without a limit' do
        expect(FactoryGirl.build(:account, limit: nil, account_type: 'loan')).not_to be_valid
      end

      it 'is invalid if limit is not a number' do
        expect(FactoryGirl.build(:account, limit: 'a', account_type: 'loan')).not_to be_valid
      end

      it 'is invalid without a term' do
        expect(FactoryGirl.build(:account, term: nil, account_type: 'loan')).not_to be_valid
      end

      it 'is invalid if term is not a number' do
        expect(FactoryGirl.build(:account, term: 'a', account_type: 'loan')).not_to be_valid
      end

      it 'is invalid without an interest_rate' do
        expect(FactoryGirl.build(:account, interest_rate: nil, account_type: 'loan')).not_to be_valid
      end

      it 'is invalid if limit is not a number' do
        expect(FactoryGirl.build(:account, interest_rate: 'a', account_type: 'loan')).not_to be_valid
      end

      it 'is invalid without a starting date' do
        expect(FactoryGirl.build(:account, starting_date: nil, account_type: 'loan')).not_to be_valid
      end
    end

    it 'is valid without a bank' do
      expect(FactoryGirl.build(:account, bank: nil)).to be_valid
    end
  end

  describe 'relationships' do
    it 'has many transactions' do
      a = FactoryGirl.create(:account)
      FactoryGirl.create(:transaction, account: a)
      FactoryGirl.create(:transaction, account: a)

      expect(a.transactions.length).to eq(2)
    end

    it 'has many patterns' do
      a = FactoryGirl.create(:account)
      FactoryGirl.create(:pattern, account: a)
      FactoryGirl.create(:pattern, account: a)

      expect(a.patterns.length).to eq(2)
    end

    it 'has many reconciliations' do
      a = FactoryGirl.create(:account)
      FactoryGirl.create(:reconciliation, account: a)
      FactoryGirl.create(:reconciliation, account: a)

      expect(a.reconciliations.length).to eq(2)
    end

    it 'has many bank statements' do
      a = FactoryGirl.create(:account)
      FactoryGirl.create(:bank_statement, account: a)
      FactoryGirl.create(:bank_statement, account: a)

      expect(a.bank_statements.length).to eq(2)
    end
  end

  describe 'properties' do
    it 'sets a name' do
      a = FactoryGirl.create(:account, name: 'Test Name1')
      expect(a.name).to eq('Test Name1')
    end

    it 'sets a bank' do
      a = FactoryGirl.create(:account, bank: 'Test Bank1')
      expect(a.bank).to eq('Test Bank1')
    end

    it 'sets a starting balance' do
      a = FactoryGirl.create(:account, starting_balance: 5001)
      expect(a.starting_balance).to eq(5001)
    end

    it 'sets a starting date' do
      a = FactoryGirl.create(:account, starting_date: '2014-02-02')
      expect(a.starting_date).to eq(Date.parse('2014-02-02'))
    end
  end

  describe 'methods' do
    before :each do
      @a = FactoryGirl.create(:account, starting_balance: 1000, starting_date: '2014-08-01')
    end

    it 'calculates current balance when there are no transactions' do
      expect(@a.current_balance).to eq(1000)
    end

    it 'calculates current balance when there are transactions' do
      FactoryGirl.create(:transaction, account: @a, date: '2014-08-4', amount: 2000)
      FactoryGirl.create(:transaction, account: @a, date: '2014-08-2', amount: 3000)

      expect(@a.current_balance).to eq(6000)
    end

    it 'calculates eod balance for a given date' do
      FactoryGirl.create(:transaction, account: @a, date: '2014-08-2', amount: 2000)
      FactoryGirl.create(:transaction, account: @a, date: '2014-08-2', amount: 3000)
      FactoryGirl.create(:transaction, account: @a, date: '2014-08-5', amount: 3000)

      expect(@a.eod_balance('2014-08-01')).to eq(1000)
      expect(@a.eod_balance('2014-08-02')).to eq(6000)
      expect(@a.eod_balance('2014-08-03')).to eq(6000)
      expect(@a.eod_balance('2014-08-04')).to eq(6000)
      expect(@a.eod_balance('2014-08-05')).to eq(9000)
      expect(@a.eod_balance('2014-08-06')).to eq(9000)
    end
  end
end
