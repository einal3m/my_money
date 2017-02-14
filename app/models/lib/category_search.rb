module Lib
  class CategorySearch < Search
    attr_reader :category, :date_range

    def initialize(attrs)
      @category = attrs.fetch(:category, nil)
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
      @category_type = attrs.fetch(:category_type, nil)
      @factor = set_factor
    end

    def transaction_query
      if @category_type.nil?
        base_query
      else
        base_query.where("#{@factor}*amount > 0")
      end
    end

    def base_query
      Transaction
        .for_banking_accounts
        .where(category: @category)
        .find_by_date(@date_range)
        .reverse_date_order
        .where(matching_transaction: nil)
    end

    def set_factor
      return nil if @category_type.nil?
      return -1 if @category_type.name == 'Expense'
      1
    end
  end
end
