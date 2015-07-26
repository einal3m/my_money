class CategoryDestroyer
  def initialize(category)
    @category = category
  end

  def execute
    validate_category
    @category.destroy!
  end

  def validate_category
    raise MyMoneyError, 'Cannot delete a category that has subcategories' if @category.subcategories.length > 0
    raise MyMoneyError, 'Cannot delete a category that has been allocated to transactions' if @category.transactions.length > 0
    raise MyMoneyError, 'Cannot delete a category that is assigned to patterns' if @category.patterns.length > 0
  end
end
