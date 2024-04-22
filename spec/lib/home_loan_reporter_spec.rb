# frozen_string_literal: true

require 'rails_helper'
require_relative '../../app/models/lib/date_range'

RSpec.describe Lib::HomeLoanReporter, type: :class do
  let(:account) { FactoryBot.create(:account, starting_date: '2016-01-01') }
  let(:calculator) { instance_double Lib::LoanCalculator }
  let(:reporter) { described_class.new(account) }
  let(:dr) { instance_double Lib::CustomDateRange }
  let(:result) { reporter.execute }

  before do
    allow(Lib::LoanCalculator).to receive(:new).and_return(calculator)
    allow(calculator).to receive_messages(
      minimum_repayment: 8561,
      minimum_amortization: [['2017-01-01', 3], ['2017-02-28', 4]],
      budget_amortization: [['2017-01-01', 6], ['2017-02-28', 7]]
    )

    allow(Date).to receive(:yesterday).and_return(Date.new(2016, 12, 31))

    allow(Lib::CustomDateRange).to receive(:new).with(
      from_date: '2016-01-01',
      to_date: '2016-12-31'
    ).and_return(dr)

    balance_search = instance_double Lib::BalanceSearch
    allow(Lib::BalanceSearch).to receive(:new).with(account:, date_range: dr).and_return(balance_search)
    allow(balance_search).to receive(:eod_balance).and_return(
      [['2016-01-01', 0], ['2016-01-02', -1], ['2016-02-28', -2]]
    )
  end

  describe 'initialize' do
    it 'sets the account id' do
      expect(reporter.account).to eq(account)
    end
  end

  describe 'minimum repayment' do
    it 'returns the minimum repayment' do
      expect(result[:minimum_repayment]).to eq(8561)
    end
  end

  describe 'minimum repayment ammortization' do
    it 'returns the minimum amortization' do
      expect(result[:minimum_amortization]).to eq(
        [['2016-01-02', 1], ['2016-02-28', 2], ['2017-01-01', 3], ['2017-02-28', 4]]
      )
    end
  end

  describe 'budget repayment ammortization' do
    it 'returns the budget amortization' do
      expect(result[:budget_amortization]).to eq(
        [['2016-01-02', 1], ['2016-02-28', 2], ['2017-01-01', 6], ['2017-02-28', 7]]
      )
    end
  end
end
