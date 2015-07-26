require 'exceptions/my_money_error'

class SubcategoryDestroyer
  def initialize(subcategory)
    @subcategory = subcategory
  end

  def execute
    validate_subcategory
    @subcategory.destroy!
  end

  def validate_subcategory
    raise MyMoneyError, 'Cannot delete a subcategory that has been allocated to transactions' if @subcategory.transactions.length > 0
    raise MyMoneyError, 'Cannot delete a subcategory that is assigned to patterns' if @subcategory.patterns.length > 0
  end
end
