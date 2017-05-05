class SubcategoriesQuery
  def execute
    { subcategories: SubcategorySerializer.new(Subcategory.all).serialize }
  end
end
