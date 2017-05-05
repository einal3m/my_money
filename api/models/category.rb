class Category < Sequel::Model
  plugin :validation_helpers

  one_to_many :subcategories

  def validate
    super
    validates_presence [:name, :category_type_id]
  end
end
