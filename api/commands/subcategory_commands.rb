class SubcategoryCommands
  def create(params)
    subcategory = Subcategory.new(params)
    check_category_exists(params[:category_id])

    subcategory.save
    subcategory.id

  rescue Sequel::NoMatchingRow
    raise_validation_error(subcategory)
  end

  def update(subcategory, params)
    check_category_exists(params[:category_id])
    subcategory.update(params)

  rescue Sequel::NoMatchingRow
    raise_validation_error(subcategory)
  end

  def delete(subcategory)
    subcategory.delete
  end

  private

  def raise_validation_error(subcategory)
    subcategory.errors.add(:category, 'not found')
    raise Sequel::ValidationFailed, subcategory
  end

  def check_category_exists(category_id)
    return if category_id.nil?
    Category.with_pk!(category_id)
  end
end
