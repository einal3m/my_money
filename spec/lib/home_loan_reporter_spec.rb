require 'rails_helper'

RSpec.describe Lib::HomeLoanReporter, type: :class do
  describe 'initialize' do
    it 'sets the account id' do
      account = FactoryGirl.create(:account, account_type: 'loan')
      reporter = Lib::HomeLoanReporter.new(account)
      expect(reporter.account).to eq(account)
    end
  end
end
