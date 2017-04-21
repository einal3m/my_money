require_relative 'model_serializer'

class CategorySerializer
  include ModelSerializer

  attributes :id, :name, :category_type_id
end
