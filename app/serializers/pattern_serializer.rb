# frozen_string_literal: true

class PatternSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :match_text, :notes, :category_id, :subcategory_id
end
