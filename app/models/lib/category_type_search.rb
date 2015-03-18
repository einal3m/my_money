module Lib
  class CategoryTypeSearch < Search
    def initialize(attrs)
      @category_type = attrs.fetch(:category_type, nil)
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
    end

    def transaction_query
      Transaction.joins(:category)
        .where(categories: { category_type_id: @category_type.id })
        .find_by_date(@date_range)
        .reverse_date_order
    end
  end
end
