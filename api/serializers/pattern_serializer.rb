require_relative 'model_serializer'

class PatternSerializer
  include ModelSerializer

  attributes :id, :account_id, :match_text, :category_id, :subcategory_id, :notes
end
