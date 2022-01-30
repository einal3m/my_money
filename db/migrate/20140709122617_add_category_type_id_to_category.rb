class AddCategoryTypeIdToCategory < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :category_type_id, :integer
  end
end
