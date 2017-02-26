require 'rails_helper'

RSpec.describe Lib::LoanCalculator, type: :class do
  before :each do
    @account = FactoryGirl.create(:account,
      account_type: 'loan', term: 2, interest_rate: 5.00, starting_balance: -100_000, starting_date: '2015-12-21'
    )
    @calculator = Lib::LoanCalculator.new(@account)

    allow(Date).to receive(:today).and_return(Date.new(2016, 12, 21))
  end

  describe 'initialize' do
    it 'sets the account id' do
      expect(@calculator.account).to eq(@account)
    end
  end

  describe 'minimum repayment' do
    it 'calculates the minimum loan repayment from current date to end of loan term' do
      expect(@calculator.minimum_repayment).to eq(8561)
    end
  end

  describe 'minimum repayment ammortization' do
    it 'calculates the balance at end of each month based on minimum repayment' do
      expect(@calculator.minimum_amortization).to eq(
        [
          ['2016-12-31', 91856],
          ['2017-01-31', 83678],
          ['2017-02-28', 75466],
          ['2017-03-31', 67220],
          ['2017-04-30', 58939],
          ['2017-05-31', 50624],
          ['2017-06-30', 42274],
          ['2017-07-31', 33889],
          ['2017-08-31', 25470],
          ['2017-09-30', 17015],
          ['2017-10-31', 8525],
          ['2017-11-30', 0]
        ]
      )
    end
  end
end
