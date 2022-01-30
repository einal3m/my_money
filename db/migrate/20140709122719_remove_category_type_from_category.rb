class RemoveCategoryTypeFromCategory < ActiveRecord::Migration[6.0]
  def change
    remove_column :categories, :category_type, :string
  end
end
