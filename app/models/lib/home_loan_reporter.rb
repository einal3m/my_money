module Lib
  class HomeLoanReporter
    attr_reader :account

    def initialize(account)
      @account = account
    end

    def execute
      { minimum_repayment: minimum_repayment }
    end

    private

    # Minimum loan repayment
    #
    # P = (Pv*R) / [1 - (1 + R)^(-n)]
    #
    # where
    #
    # Pv  = Present Value
    # R   = Periodic Interest Rate = Annual Percentage Rate / number of interest periods per year
    # n   = total number of interest periods
    #
    def minimum_repayment
      ((present_value * periodic_rate) / (1 - (1 + periodic_rate)**(-number_of_periods))).round(0).to_i
    end

    def present_value
      -@account.current_balance
    end

    def periodic_rate
      @account.interest_rate / 100.0 / 12.0
    end

    def number_of_periods
      account.term * 12
    end
  end
end
