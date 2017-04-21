class CategoriesQuery
  def execute
    { categories: CategorySerializer.new(Category.all).serialize }
  end
end
