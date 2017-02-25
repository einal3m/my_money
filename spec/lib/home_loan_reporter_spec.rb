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
    it 'calculates the minimum loan repayment from current date to end of loan term' do
      one_year_ago = 1.year.ago.to_date

      account = FactoryGirl.create(:account,
        account_type: 'loan', term: 2, interest_rate: 5.00, starting_balance: -100_000, starting_date: one_year_ago
      )

      reporter = Lib::HomeLoanReporter.new(account)
      result = reporter.execute

      expect(result[:minimum_repayment]).to eq(8561)
    end
  end
end
