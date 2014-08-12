FactoryGirl.define do

  factory :reconciliation do |f|
    account
    f.statement_date "2014-04-04"
    f.statement_balance 6.66
  end

  factory :reconciliation_invalid, parent: :reconciliation do |f|
    f.statement_date nil
  end

end