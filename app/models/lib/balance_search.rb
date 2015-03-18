module Lib
  # BalanceSearch
  #
  # This search retrieves the end of day balances for the specfied account for the
  # specified date range.  It also includes data for the first and last date of the date range
  # for graphing purposes.
  class BalanceSearch < Search
    attr_reader :account, :date_range
    LINE_CHART_DF = '%d %b, %Y'

    def initialize(attrs)
      @account = attrs.fetch(:account, nil)
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
    end

    # returns an array of end of day balances with the following format:
    # ["01-Jan-14", 56].  ???Does it need the first and last date in the data???
    def eod_balance
      return [] if transactions.empty?

      sql_data = transactions.group(:date).having('id = MAX(id)')
      build_data(sql_data)
    end

    private

    def transaction_query
      Transaction.where(account: @account).find_by_date(@date_range).date_order
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
      sql_data.each do |transaction|
        data << [transaction.date.strftime(LINE_CHART_DF), transaction.balance]
      end
    end

    # if first day of date range not in data, then add it
    def add_first_day(sql_data, data)
      return if (sql_data.first.date == @date_range.from_date)
      eod_balance = @account.eod_balance(@date_range.from_date - 1)
      data.unshift([@date_range.from_date.strftime(LINE_CHART_DF), eod_balance])
    end

    # if last day of date range not in data, then add it
    def add_last_day(sql_data, data)
      return if (sql_data.last.date == @date_range.to_date)
      data << [@date_range.to_date.strftime(LINE_CHART_DF), data.last[1]]
    end
  end
end
