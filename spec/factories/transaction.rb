# frozen_string_literal: true

FactoryBot.define do
  factory :transaction do
    date { '2014-03-03' }
    memo { 'This is a Memo' }
    notes { 'This is a Note' }
    amount { 555 }
    fitid { 'This is a fitid' }
    transaction_type { 'bank_transaction' }
    account { FactoryBot.create(:account) }
  end

  factory :transaction_invalid, parent: :transaction do
    date { nil }
  end
end
