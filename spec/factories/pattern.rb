# frozen_string_literal: true

FactoryBot.define do
  factory :pattern do
    account
    match_text { 'New Pattern' }
    notes { 'Pattern Note' }
    category
    subcategory
  end

  factory :pattern_invalid, parent: :pattern do
    match_text { nil }
  end
end
