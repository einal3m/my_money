class AddCategoryToPattern < ActiveRecord::Migration
  def change
    add_column :patterns, :category_id, :integer
    add_column :patterns, :subcategory_id, :integer
  end
end
