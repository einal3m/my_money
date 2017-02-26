module Lib
  class HomeLoanReporter
    attr_reader :account

    def initialize(account)
      @account = account
    end

    def execute
      {
        minimum_repayment: loan_calculator.minimum_repayment,
        minimum_amortization: loan_calculator.minimum_amortization
      }
    end

    private

    def loan_calculator
      @loan_calculator ||= Lib::LoanCalculator.new(@account)
    end
  end
end
