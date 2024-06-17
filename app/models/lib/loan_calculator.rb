# frozen_string_literal: true

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
      month = (Time.zone.today << 1).beginning_of_month

      Array.new(periods_remaining) do
        end_of_month_balance = next_minimum_repayment_balance(end_of_month_balance)
        month >>= 1
        [
          month.end_of_month.strftime('%Y-%m-%d'),
          end_of_month_balance.round
        ]
      end
    end

    def budget_amortization
      return [] if budget_below_minimum_repayment

      balances = []
      balance = present_value
      date = Time.zone.today.end_of_month

      while balance.positive?
        balance = monthly_balance(balance, date)
        balances << [date.strftime('%Y-%m-%d'), balance.round]
        date = (date >> 1).end_of_month
      end

      balances[-1][1] = 0
      balances
    end

    private

    def budget_below_minimum_repayment
      @account.budgets.sum(&:amount) < minimum_repayment_precise
    end

    def monthly_balance(balance, date)
      day = 1
      monthly_interest = 0

      budgets.each do |budget|
        monthly_interest += interest(balance, budget.day_of_month, day)
        day = budget.day_of_month
        balance -= budget.amount
      end

      monthly_interest += interest(balance, date.day + 1, day)
      balance += monthly_interest

      balance
    end

    def minimum_repayment_precise
      @minimum_repayment_precise ||= (present_value * periodic_rate) / (1 - ((1 + periodic_rate)**-periods_remaining))
    end

    def present_value
      @present_value ||= -@account.current_balance
    end

    def daily_rate
      @daily_rate ||= @account.interest_rate / 100.0 / 365.0
    end

    def periodic_rate
      @periodic_rate ||= @account.interest_rate / 100.0 / 12.0
    end

    def periods_remaining
      @periods_remaining ||=
        (account.term * 12) - ((Time.zone.today.to_time - account.starting_date.to_time) / 1.month.second).floor
    end

    def next_minimum_repayment_balance(current_balance)
      ((current_balance * (1 + periodic_rate)) - minimum_repayment_precise)
    end

    def interest(balance, from_day, to_day)
      balance * daily_rate * (from_day - to_day)
    end

    def budgets
      @budgets ||= @account.budgets.order(:day_of_month)
    end
  end
end
