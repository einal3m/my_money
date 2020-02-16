# frozen_string_literal: true

module Lib
  class CategoryTypeSearch < Search
    def initialize(attrs)
      @category_type = attrs.fetch(:category_type, nil)
      @category = nil
      @date_range = attrs.fetch(:date_range, Lib::CurrentMonthDateRange.new)
    end

    def group_by(*attrs)
      raise ArgumentError unless valid_params(*attrs)

      group_query(*attrs).map do |d|
        group_data = { sum: d.group_sum }
        attrs.each do |attribute|
          group_data[attribute] = d[attribute]
        end
        group_data
      end
    end

    private

    def transaction_query
      Transaction
        .joins(:category)
        .where(categories: { category_type_id: @category_type.id })
        .find_by_date(@date_range)
        .reverse_date_order
    end

    def group_query(*attrs)
      transactions.select(*attrs, 'SUM(amount) as group_sum').group(*attrs)
    end

    # attrs must be a list of symbols
    def valid_params(*attrs)
      attrs.each do |attribute|
        return false unless attribute.is_a? Symbol
      end
      true
    end
  end
end
