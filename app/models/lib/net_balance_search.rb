# frozen_string_literal: true

module Lib
  # NetBalance
  #
  # This search retrieves the end of day balances for all accounts for the
  # specified date range.
  class NetBalanceSearch < Search
    attr_reader :date_range

    LINE_CHART_DF = '%d %b, %Y'

    def initialize(attrs)
      super()
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
    end

    # returns an array of end of day balances with the following format:
    # ["01-Jan-14", 56].
    def eod_balance
      sql_data = transactions.to_a.group_by(&:date).sort
      build_data(sql_data)
    end

    private

    def transaction_query
      Transaction.search_by_date(@date_range).date_order
    end

    # Only need date and eod balance
    def build_data(sql_data)
      data = []
      add_first_day(sql_data, data)
      format_data(sql_data, data)
      add_last_day(sql_data, data)
      data
    end

    def format_data(sql_data, data)
      balance = data.first&.last || total_eod_balance(sql_data.first.first - 1.day)

      sql_data.each do |date, ts|
        balance += ts.sum(&:amount)
        data << [date.strftime(LINE_CHART_DF), balance]
      end
    end

    # if first day of date range not in data, then add it
    def add_first_day(sql_data, data)
      first_day = @date_range.from_date
      return if sql_data.first && (sql_data.first.first == first_day)

      data.unshift([first_day.strftime(LINE_CHART_DF), total_eod_balance(first_day)])
    end

    def total_eod_balance(date)
      eod_balance = 0
      Account.find_each do |a|
        eod_balance += a.eod_balance(date).to_i
      end
      eod_balance
    end

    # if last day of date range not in data, then add it
    def add_last_day(sql_data, data)
      return if sql_data.last && (sql_data.last.first == @date_range.to_date)

      data << [@date_range.to_date.strftime(LINE_CHART_DF), data.last[1]]
    end
  end
end
