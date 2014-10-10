class AddNotesToPatterns < ActiveRecord::Migration
  def change
    add_column :patterns, :notes, :string
  end
end
