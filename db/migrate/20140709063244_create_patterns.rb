class CreatePatterns < ActiveRecord::Migration[6.0]
  def change
    create_table :patterns do |t|
      t.integer :account_id
      t.string :match_text

      t.timestamps
    end
  end
end
