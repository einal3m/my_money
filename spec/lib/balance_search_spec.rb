require 'rails_helper'
require 'lib/date_range'

RSpec.describe Lib::BalanceSearch, type: :class do
  before :each do
    @a = FactoryGirl.create(:account, starting_balance: 0)
    @t1 = FactoryGirl.create(:transaction, account: @a, date: '2014-01-01', amount: 4) # 4
    @t2 = FactoryGirl.create(:transaction, account: @a, date: '2014-01-02', amount: 10) # 14
    @t3 = FactoryGirl.create(:transaction, account: @a, date: '2014-01-02', amount: -12) # 2
    @t4 = FactoryGirl.create(:transaction, account: @a, date: '2014-02-02', amount: 15) # 17
    @t5 = FactoryGirl.create(:transaction, account: @a, date: '2014-02-02', amount: 5) # 22
    @t6 = FactoryGirl.create(:transaction, account: @a, date: '2014-03-02', amount: -6) # 16
    @t7 = FactoryGirl.create(:transaction, account: @a, date: '2014-03-31', amount: 7) # 23

    @dr = Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-03-31')
  end

  it 'retrieves the end of day balances for date range' do
    search = Lib::BalanceSearch.new(account: @a, date_range: @dr)
    expect(search.eod_balance).to eq([
      ['01 Jan, 2014', 4.0],
      ['02 Jan, 2014', 2],
      ['02 Feb, 2014', 22],
      ['02 Mar, 2014', 16],
      ['31 Mar, 2014', 23]
    ])
  end

  it 'provides first and last date of date range if no transactions on those days' do
    @t1.update(date: '2014-01-02')
    @t7.update(date: '2014-03-02')

    search = Lib::BalanceSearch.new(account: @a, date_range: @dr)
    expect(search.eod_balance).to eq([
      ['01 Jan, 2014', 0],
      ['02 Jan, 2014', 2],
      ['02 Feb, 2014', 22],
      ['02 Mar, 2014', 23],
      ['31 Mar, 2014', 23]
    ])
  end

  it 'returns an empty array, if no data is found' do
    dr_no_data = Lib::CustomDateRange.new(from_date: '2013-01-01', to_date: '2013-03-31')
    search = Lib::BalanceSearch.new(account: @a, date_range: dr_no_data)

    expect(search.eod_balance).to be_empty
  end
end
