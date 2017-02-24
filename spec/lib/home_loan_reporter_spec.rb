require 'rails_helper'

RSpec.describe Lib::HomeLoanReporter, type: :class do
  describe 'initialize' do
    it 'sets the account id' do
      account = FactoryGirl.create(:account, account_type: 'loan')
      reporter = Lib::HomeLoanReporter.new(account)
      expect(reporter.account).to eq(account)
    end
  end

  describe 'minimum repayment' do
    it 'calculates the minimum loan repayment' do
      account = FactoryGirl.create(:account,
        account_type: 'loan', term: 30, interest_rate: 3.89, starting_balance: -45_000_000
      )

      reporter = Lib::HomeLoanReporter.new(account)
      result = reporter.execute

      expect(result[:minimum_repayment]).to eq(211_993)
    end
  end
end
