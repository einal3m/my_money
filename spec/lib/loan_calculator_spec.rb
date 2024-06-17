# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Lib::LoanCalculator, type: :class do
  let(:account) do
    FactoryBot.create(
      :account,
      account_type: 'loan',
      term: 2,
      interest_rate: 5.00,
      starting_balance: -100_000,
      starting_date: '2015-12-21'
    )
  end

  let(:calculator) { described_class.new(account) }

  before do
    FactoryBot.create(:budget, account:, day_of_month: 20, amount: -5_000)
    FactoryBot.create(:budget, account:, day_of_month: 10, amount: 20_000)

    allow(Time.zone).to receive(:today).and_return(Date.new(2016, 12, 21))
  end

  describe 'initialize' do
    it 'sets the account id' do
      expect(calculator.account).to eq(account)
    end
  end

  describe 'minimum repayment' do
    it 'calculates the minimum loan repayment from current date to end of loan term' do
      expect(calculator.minimum_repayment).to eq(8561)
    end
  end

  describe 'minimum repayment ammortization' do
    it 'calculates the balance at end of each month based on minimum repayment' do
      expect(calculator.minimum_amortization).to eq(
        [
          ['2016-12-31', 91_856],
          ['2017-01-31', 83_678],
          ['2017-02-28', 75_466],
          ['2017-03-31', 67_220],
          ['2017-04-30', 58_939],
          ['2017-05-31', 50_624],
          ['2017-06-30', 42_274],
          ['2017-07-31', 33_889],
          ['2017-08-31', 25_470],
          ['2017-09-30', 17_015],
          ['2017-10-31', 8525],
          ['2017-11-30', 0]
        ]
      )
    end
  end

  describe 'budget repayment ammortization' do
    it 'calculates the balance at end of each month based on budget repayment' do
      expect(calculator.budget_amortization).to eq(
        [
          ['2016-12-31', 85_373],
          ['2017-01-31', 70_683],
          ['2017-02-28', 55_908],
          ['2017-03-31', 41_094],
          ['2017-04-30', 26_213],
          ['2017-05-31', 11_272],
          ['2017-06-30', 0]
        ]
      )
    end

    it 'returns an empty array if total budget amounts are less than the minimum repayment' do
      FactoryBot.create(:budget, account:, day_of_month: 20, amount: 8561 - 15_000 - 1)
      expect(calculator.budget_amortization).to eq([])
    end
  end
end
