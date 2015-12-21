class CategoryTypeSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :editable

  def editable
    object.editable?
  end
end
