require 'rails_helper'
require 'lib/date_range'

RSpec.describe Lib::HomeLoanReporter, type: :class do
  before :each do
    @account = FactoryGirl.create(:account, starting_date: '2016-01-01')
    @reporter = Lib::HomeLoanReporter.new(@account)

    calculator = instance_double Lib::LoanCalculator
    expect(Lib::LoanCalculator).to receive(:new).and_return(calculator)
    expect(calculator).to receive(:minimum_repayment).and_return(8561)
    expect(calculator).to receive(:minimum_amortization).and_return([['2017-01-01', 3], ['2017-02-28', 4]])

    allow(Date).to receive(:yesterday).and_return(Date.new(2016, 12, 31))

    dr = instance_double Lib::CustomDateRange
    expect(Lib::CustomDateRange).to receive(:new).with(from_date: '2016-01-01', to_date: '2016-12-31').and_return(dr)

    balance_search = instance_double Lib::BalanceSearch
    expect(Lib::BalanceSearch).to receive(:new).with(account: @account, date_range: dr).and_return(balance_search)
    expect(balance_search).to receive(:eod_balance).and_return(
      [['2016-01-01', 0], ['2016-01-02', -1], ['2016-02-28', -2]]
    )

    @result = @reporter.execute
  end

  describe 'initialize' do
    it 'sets the account id' do
      expect(@reporter.account).to eq(@account)
    end
  end

  describe 'minimum repayment' do
    it 'returns the minimum repayment' do
      expect(@result[:minimum_repayment]).to eq(8561)
    end
  end

  describe 'minimum repayment ammortization' do
    it 'returns the amortization' do
      expect(@result[:minimum_amortization]).to eq(
        [['2016-01-02', 1], ['2016-02-28', 2], ['2017-01-01', 3], ['2017-02-28', 4]]
      )
    end
  end
end
