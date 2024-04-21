# frozen_string_literal: true

require_relative '../exceptions/my_money_error'

class SubcategoryDestroyer
  def initialize(subcategory)
    @subcategory = subcategory
  end

  def execute
    validate_subcategory
    @subcategory.destroy!
  end

  def validate_subcategory
    unless @subcategory.transactions.empty?
      raise MyMoneyError, 'Cannot delete a subcategory that has been allocated to transactions'
    end
    raise MyMoneyError, 'Cannot delete a subcategory that is assigned to patterns' unless @subcategory.patterns.empty?
  end
end
