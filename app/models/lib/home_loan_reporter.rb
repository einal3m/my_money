require 'lib/date_range'

module Lib
  class HomeLoanReporter
    attr_reader :account

    def initialize(account)
      @account = account
    end

    def execute
      {
        minimum_repayment: loan_calculator.minimum_repayment,
        minimum_amortization: eod_balance.drop(1).concat(loan_calculator.minimum_amortization)
      }
    end

    private

    def loan_calculator
      @loan_calculator ||= Lib::LoanCalculator.new(@account)
    end

    def eod_balance
      @eod_balance ||= balance_search.eod_balance.map { |balance| [balance[0], -balance[1]] }
    end

    def balance_search
      @balance_search ||= Lib::BalanceSearch.new(account: @account, date_range: start_of_loan_to_yesterday)
    end

    def start_of_loan_to_yesterday
      @start_of_loan_to_yesterday ||= Lib::CustomDateRange.new(
        from_date: @account.starting_date.strftime('%Y-%m-%d'), to_date: Date.yesterday.strftime('%Y-%m-%d')
      )
    end
  end
end
