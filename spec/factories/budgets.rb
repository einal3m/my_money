# frozen_string_literal: true

FactoryBot.define do
  factory :budget do
    account { FactoryBot.create(:account) }
    description { 'MyString' }
    day_of_month { 1 }
    amount { 1 }
  end
end
