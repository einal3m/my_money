# frozen_string_literal: true

class SubcategorySerializer < ActiveModel::Serializer
  attributes :id, :category_id, :name
end
