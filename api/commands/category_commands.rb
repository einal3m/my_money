class CategoryCommands
  def create(params)
    category = Category.create(params)
    category.id
  end

  def update(category, params)
    category.update(params)
  end

  def delete(category)
    category.delete
  end
end
