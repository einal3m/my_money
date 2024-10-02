# frozen_string_literal: true

require 'rails_helper'
require_relative '../../app/models/lib/date_range'

RSpec.describe Lib::NetBalanceSearch, type: :class do
  def setup_test_data
    a = FactoryBot.create(:account, starting_balance: 0, starting_date: '2013-12-25')
    b = FactoryBot.create(:account, starting_balance: 0, starting_date: '2013-12-25')
    t1 = FactoryBot.create(:transaction, account: a, date: '2014-01-01', amount: 4) # 4
    t2 = FactoryBot.create(:transaction, account: a, date: '2014-01-02', amount: 10) # 14
    t3 = FactoryBot.create(:transaction, account: b, date: '2014-01-02', amount: -12) # 2
    t4 = FactoryBot.create(:transaction, account: a, date: '2014-02-02', amount: 15) # 17
    t5 = FactoryBot.create(:transaction, account: a, date: '2014-02-02', amount: 5) # 22
    t6 = FactoryBot.create(:transaction, account: b, date: '2014-03-02', amount: -6) # 16
    t7 = FactoryBot.create(:transaction, account: a, date: '2014-03-31', amount: 7) # 23

    [t1, t2, t3, t4, t5, t6, t7]
  end

  context 'when after opening balance date' do
    it 'retrieves the end of day balances for date range' do
      setup_test_data
      dr = Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-03-31')

      search = described_class.new(date_range: dr)

      expect(search.eod_balance).to eq(
        [
          ['01 Jan, 2014', 4.0],
          ['02 Jan, 2014', 2],
          ['02 Feb, 2014', 22],
          ['02 Mar, 2014', 16],
          ['31 Mar, 2014', 23]
        ]
      )
    end

    context 'when midway through transactions' do
      it 'retrieves the end of day balances for date range' do
        setup_test_data
        dr = Lib::CustomDateRange.new(from_date: '2014-02-02', to_date: '2014-03-31')

        search = described_class.new(date_range: dr)

        expect(search.eod_balance).to eq(
          [
            ['02 Feb, 2014', 22],
            ['02 Mar, 2014', 16],
            ['31 Mar, 2014', 23]
          ]
        )
      end
    end

    it 'provides first and last date of date range if no transactions on those days' do
      t1, _, _, _, _, _, t7 = setup_test_data
      dr = Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-03-31')
      t1.update(date: '2014-01-02')
      t7.update(date: '2014-03-02')

      search = described_class.new(date_range: dr)

      expect(search.eod_balance).to eq(
        [
          ['01 Jan, 2014', 0],
          ['02 Jan, 2014', 2],
          ['02 Feb, 2014', 22],
          ['02 Mar, 2014', 23],
          ['31 Mar, 2014', 23]
        ]
      )
    end

    it 'provides first and last date of date range if no transactions in date range' do
      setup_test_data
      dr = Lib::CustomDateRange.new(from_date: '2014-01-05', to_date: '2014-01-10')

      search = described_class.new(date_range: dr)

      expect(search.eod_balance).to eq(
        [
          ['05 Jan, 2014', 2],
          ['10 Jan, 2014', 2]
        ]
      )
    end
  end

  context 'when before and after opening balance date' do
    it 'returns data from the opening balance date' do
      setup_test_data
      dr = Lib::CustomDateRange.new(from_date: '2013-12-01', to_date: '2014-03-31')

      search = described_class.new(date_range: dr)

      expect(search.eod_balance).to eq(
        [
          ['01 Dec, 2013', 0],
          ['01 Jan, 2014', 4.0],
          ['02 Jan, 2014', 2],
          ['02 Feb, 2014', 22],
          ['02 Mar, 2014', 16],
          ['31 Mar, 2014', 23]
        ]
      )
    end
  end

  context 'when before any transaction' do
    it 'returns the balance at that time' do
      setup_test_data
      dr = Lib::CustomDateRange.new(from_date: '2013-12-01', to_date: '2013-12-24')

      search = described_class.new(date_range: dr)

      expect(search.eod_balance).to eq(
        [
          ['01 Dec, 2013', 0],
          ['24 Dec, 2013', 0]
        ]
      )
    end
  end

  context 'when after any transaction' do
    it 'returns the balance at that time' do
      setup_test_data
      dr = Lib::CustomDateRange.new(from_date: '2014-04-01', to_date: '2014-04-24')

      search = described_class.new(date_range: dr)

      expect(search.eod_balance).to eq(
        [
          ['01 Apr, 2014', 23],
          ['24 Apr, 2014', 23]
        ]
      )
    end
  end
end
