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
      ((present_value * periodic_rate) / (1 - (1 + periodic_rate)**(-periods_remaining))).round(0).to_i
    end

    def present_value
      -@account.current_balance
    end

    def periodic_rate
      @account.interest_rate / 100.0 / 12.0
    end

    def periods_remaining
      number_of_periods_complete = ((Date.today.to_time - account.starting_date.to_time) / 1.month.second).floor
      account.term * 12 - number_of_periods_complete
    end
  end
end
