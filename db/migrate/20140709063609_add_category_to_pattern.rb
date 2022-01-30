class AddCategoryToPattern < ActiveRecord::Migration[6.0]
  def change
    add_column :patterns, :category_id, :integer
    add_column :patterns, :subcategory_id, :integer
  end
end
