module Lib
  class CategorySearch < Search
    attr_reader :category, :date_range

    def initialize(attrs)
      @category = attrs.fetch(:category, nil)
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
    end

    def transaction_query
      Transaction.where(category: @category).find_by_date(@date_range).reverse_date_order
    end
  end
end
