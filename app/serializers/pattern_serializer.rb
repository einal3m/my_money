class PatternSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :match_text, :category_id, :subcategory_id
end
