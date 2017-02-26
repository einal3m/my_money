module Lib
  class LoanCalculator
    attr_reader :account

    def initialize(account)
      @account = account
    end

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
      minimum_repayment_precise.round.to_i
    end

    # Minimum amortization
    #
    # B(i+1) = B(i) * (1 + R) - P
    #
    # where
    #
    # B = Balance for period i
    # R = Periodic Interest Rate = Annual Percentage Rate / number of interest periods per year
    # P = periodic payment
    #
    def minimum_amortization
      end_of_month_balance = present_value
      month = (Date.today << 1).beginning_of_month

      periods_remaining.times.map do
        end_of_month_balance = next_minimum_repayment_balance(end_of_month_balance)
        month = month >> 1
        [
          month.end_of_month.strftime('%Y-%m-%d'),
          end_of_month_balance.round
        ]
      end
    end

    private

    def minimum_repayment_precise
      @minimum_repayment_precise ||= (present_value * periodic_rate) / (1 - (1 + periodic_rate)**(-periods_remaining))
    end

    def present_value
      @present_value ||= -@account.current_balance
    end

    def periodic_rate
      @periodic_rate ||= @account.interest_rate / 100.0 / 12.0
    end

    def periods_remaining
      @periods_remaining ||=
        account.term * 12 - ((Date.today.to_time - account.starting_date.to_time) / 1.month.second).floor
    end

    def next_minimum_repayment_balance(current_balance)
      (current_balance * (1 + periodic_rate) - minimum_repayment_precise)
    end
  end
end
