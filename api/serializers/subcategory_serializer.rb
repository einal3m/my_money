require_relative 'model_serializer'

class SubcategorySerializer
  include ModelSerializer

  attributes :id, :category_id, :name
end
