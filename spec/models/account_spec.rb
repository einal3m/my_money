# frozen_string_literal: true

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
RSpec.describe Account do
  it 'has a valid factory' do
    a = FactoryBot.create(:account)

    expect(a).to be_valid
    expect(a).to be_a(described_class)
  end

  describe 'defaults' do
    it 'to zero starting balance' do
      expect(described_class.new.starting_balance).to eq(0)
    end
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryBot.build(:account, name: nil)).not_to be_valid
    end

    it 'is invalid without an account type' do
      expect(FactoryBot.build(:account, account_type: nil)).not_to be_valid
    end

    describe 'savings' do
      it 'is invalid without a starting balance' do
        expect(FactoryBot.build(:account, starting_balance: nil, account_type: 'savings')).not_to be_valid
      end

      it 'is invalid without a starting date' do
        expect(FactoryBot.build(:account, starting_date: nil, account_type: 'savings')).not_to be_valid
      end

      it 'is invalid if starting balance is not a number' do
        expect(FactoryBot.build(:account, starting_balance: 'a', account_type: 'savings')).not_to be_valid
      end

      it 'is valid without a ticker' do
        expect(FactoryBot.build(:account, ticker: nil, account_type: 'savings')).to be_valid
      end
    end

    describe 'shares' do
      it 'is invalid without a ticker' do
        expect(FactoryBot.build(:account, ticker: nil, account_type: 'share')).not_to be_valid
      end

      it 'is valid without a starting_balance or starting_date' do
        expect(FactoryBot.build(:account, starting_balance: nil, account_type: 'share')).to be_valid
        expect(FactoryBot.build(:account, starting_date: nil, account_type: 'share')).to be_valid
      end
    end

    describe 'loan' do
      it 'is invalid without a limit' do
        expect(FactoryBot.build(:account, limit: nil, account_type: 'loan')).not_to be_valid
      end

      it 'is invalid if limit is not a number' do
        expect(FactoryBot.build(:account, limit: 'a', account_type: 'loan')).not_to be_valid
      end

      it 'is invalid without a term' do
        expect(FactoryBot.build(:account, term: nil, account_type: 'loan')).not_to be_valid
      end

      it 'is invalid if term is not a number' do
        expect(FactoryBot.build(:account, term: 'a', account_type: 'loan')).not_to be_valid
      end

      it 'is invalid without an interest_rate' do
        expect(FactoryBot.build(:account, interest_rate: nil, account_type: 'loan')).not_to be_valid
      end

      it 'is invalid if interest rate is not a number' do
        expect(FactoryBot.build(:account, interest_rate: 'a', account_type: 'loan')).not_to be_valid
      end

      it 'is invalid without a starting date' do
        expect(FactoryBot.build(:account, starting_date: nil, account_type: 'loan')).not_to be_valid
      end
    end

    it 'is valid without a bank' do
      expect(FactoryBot.build(:account, bank: nil)).to be_valid
    end
  end

  describe 'relationships' do
    it 'has many transactions' do
      a = FactoryBot.create(:account)
      FactoryBot.create(:transaction, account: a)
      FactoryBot.create(:transaction, account: a)

      expect(a.transactions.length).to eq(2)
    end

    it 'has many patterns' do
      a = FactoryBot.create(:account)
      FactoryBot.create(:pattern, account: a)
      FactoryBot.create(:pattern, account: a)

      expect(a.patterns.length).to eq(2)
    end

    it 'has many reconciliations' do
      a = FactoryBot.create(:account)
      FactoryBot.create(:reconciliation, account: a)
      FactoryBot.create(:reconciliation, account: a)

      expect(a.reconciliations.length).to eq(2)
    end

    it 'has many bank statements' do
      a = FactoryBot.create(:account)
      FactoryBot.create(:bank_statement, account: a)
      FactoryBot.create(:bank_statement, account: a)

      expect(a.bank_statements.length).to eq(2)
    end

    it 'has many budgets' do
      a = FactoryBot.create(:account)
      FactoryBot.create(:budget, account: a)
      FactoryBot.create(:budget, account: a)

      expect(a.budgets.length).to eq(2)
    end
  end

  describe 'properties' do
    it 'sets a name' do
      a = FactoryBot.create(:account, name: 'Test Name1')
      expect(a.name).to eq('Test Name1')
    end

    it 'sets a bank' do
      a = FactoryBot.create(:account, bank: 'Test Bank1')
      expect(a.bank).to eq('Test Bank1')
    end

    it 'sets a starting balance' do
      a = FactoryBot.create(:account, starting_balance: 5001)
      expect(a.starting_balance).to eq(5001)
    end

    it 'sets a starting date' do
      a = FactoryBot.create(:account, starting_date: '2014-02-02')
      expect(a.starting_date).to eq(Date.parse('2014-02-02'))
    end

    it 'sets a deleted_at date' do
      a = FactoryBot.create(:account, deleted_at: '2014-02-02')
      expect(a.deleted_at).to eq(Date.parse('2014-02-02'))
    end
  end

  describe 'methods' do
    let!(:a) { FactoryBot.create(:account, starting_balance: 1000, starting_date: '2014-08-01') }

    it 'calculates current balance when there are no transactions' do
      expect(a.current_balance).to eq(1000)
    end

    it 'calculates current balance when there are transactions' do
      FactoryBot.create(:transaction, account: a, date: '2014-08-4', amount: 2000)
      FactoryBot.create(:transaction, account: a, date: '2014-08-2', amount: 3000)

      expect(a.current_balance).to eq(6000)
    end

    it 'calculates eod balance for a given date' do
      FactoryBot.create(:transaction, account: a, date: '2014-08-2', amount: 2000)
      FactoryBot.create(:transaction, account: a, date: '2014-08-2', amount: 3000)
      FactoryBot.create(:transaction, account: a, date: '2014-08-5', amount: 3000)

      expect(a.eod_balance('2014-08-01')).to eq(1000)
      expect(a.eod_balance('2014-08-02')).to eq(6000)
      expect(a.eod_balance('2014-08-03')).to eq(6000)
      expect(a.eod_balance('2014-08-04')).to eq(6000)
      expect(a.eod_balance('2014-08-05')).to eq(9000)
      expect(a.eod_balance('2014-08-06')).to eq(9000)
    end
  end
end
