# frozen_string_literal: true

module Lib
  class Search
    def transactions
      @transactions ||= transaction_query
    end

    def sum
      @sum ||= transactions.sum(:amount)
    end

    def month_totals
      factor = !@category.nil? && (@category.category_type.name == 'Expense') ? -1 : 1

      # group transactions by date and sum the amount. This returns a hash with the
      # format: {"01-Feb" => 56}
      sql_data = transactions.group("strftime('%m-%Y', date)").sum("#{factor} * amount")

      generate_summary(sql_data)
    end

    private

    # generate_summary(sql_data) - takes the results of an activemodel query and converts it
    # into an array with formatted month-year and sum amount. It also ensures that every month
    # in the date range is included, even if no data exists. The sum is set to zero in this case.
    # sql_data is the result of a sum query, grouped only by date.
    def generate_summary(sql_data)
      months = generate_month_list

      # generate summary array
      summary = []
      months.each do |month_date|
        summary << [month_date.strftime('%b-%y'), sql_data[month_date.strftime('%m-%Y')] || 0]
      end

      summary
    end

    def generate_month_list
      months = []
      number_of_months.times do |month|
        months[month] = @date_range.from_date >> month
      end
      months
    end

    def number_of_months
      to_year = @date_range.to_date.year
      to_month = @date_range.to_date.month
      from_year = @date_range.from_date.year
      from_month = @date_range.from_date.month

      (to_year * 12 + to_month) - (from_year * 12 + from_month) + 1
    end
  end
end
