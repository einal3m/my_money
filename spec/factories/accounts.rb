# frozen_string_literal: true

FactoryBot.define do
  factory :account do
    account_type { 'savings' }
    name { 'New Account' }
    bank { 'New Bank' }
    ticker { 'TCK' }
    term { 30 }
    limit { 3000 }
    interest_rate { 5.67 }
    starting_balance { 999 }
    starting_date { '2014-01-01' }
    deleted_at { nil }
  end

  factory :account_invalid, parent: :account do
    name { nil }
  end
end
