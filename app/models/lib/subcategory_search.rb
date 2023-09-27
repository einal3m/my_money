# frozen_string_literal: true

module Lib
  class SubcategorySearch < Search
    attr_reader :category, :subcategory, :date_range

    def initialize(attrs)
      super

      @category = attrs.fetch(:category, nil)
      @subcategory = attrs.fetch(:subcategory, nil)
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
    end

    def transaction_query
      Transaction
        .for_banking_accounts
        .where(category: @category, subcategory: @subcategory)
        .search_by_date(@date_range)
        .reverse_date_order
        .where(matching_transaction: nil)
    end
  end
end
