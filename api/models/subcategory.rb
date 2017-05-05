class Subcategory < Sequel::Model
  plugin :validation_helpers

  many_to_one :category

  def validate
    super
    validates_presence [:name, :category]
  end
end
