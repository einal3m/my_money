class CategoryTypeQuery
  def execute
    {
      category_types: CategoryType.to_hash
    }
  end
end
