# frozen_string_literal: true

FactoryBot.define do
  factory :reconciliation do
    account
    statement_date { '2014-04-04' }
    statement_balance { 666 }
  end

  factory :reconciliation_invalid, parent: :reconciliation do
    statement_date { nil }
  end
end
