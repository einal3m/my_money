class Category < Sequel::Model
  plugin :validation_helpers

  def validate
    super
    validates_presence [:name, :category_type_id]
  end
end
