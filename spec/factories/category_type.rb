# frozen_string_literal: true

FactoryBot.define do
  factory :category_type do
    name { 'New Category' }

    factory :category_type_with_categories do
      name { 'Category Type with Categories' }

      transient do
        category_count { 1 }
      end

      after(:create) do |category_type, evaluator|
        create_list(:category, evaluator.category_count, category_type: category_type)
      end
    end
  end
end
