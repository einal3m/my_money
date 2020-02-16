# frozen_string_literal: true

FactoryBot.define do
  factory :subcategory do
    name { 'New Subcategory' }
    category
  end

  factory :subcategory_invalid, parent: :subcategory do
    name { nil }
  end
end
