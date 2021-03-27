# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { 'New Category' }
    category_type
  end

  factory :category_invalid, parent: :category do
    name { nil }
  end
end
