require 'rails_helper'

RSpec.describe Lib::HomeLoanReporter, type: :class do
  before :each do
    @account = FactoryGirl.create(:account)
    @reporter = Lib::HomeLoanReporter.new(@account)

    calculator = instance_double Lib::LoanCalculator
    expect(Lib::LoanCalculator).to receive(:new).and_return(calculator)
    expect(calculator).to receive(:minimum_repayment).and_return(8561)
    expect(calculator).to receive(:minimum_amortization).and_return([1, 2, 3])

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
      expect(@result[:minimum_amortization]).to eq([1, 2, 3])
    end
  end
end
