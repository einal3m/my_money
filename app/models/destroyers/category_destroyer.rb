# frozen_string_literal: true

require_relative '../exceptions/my_money_error'

class CategoryDestroyer
  def initialize(category)
    @category = category
  end

  def execute
    validate_category
    @category.destroy!
  end

  def validate_category
    raise MyMoneyError, 'Cannot delete a category that has subcategories' unless @category.subcategories.empty?
    unless @category.transactions.empty?
      raise MyMoneyError, 'Cannot delete a category that has been allocated to transactions'
    end
    raise MyMoneyError, 'Cannot delete a category that is assigned to patterns' unless @category.patterns.empty?
  end
end
