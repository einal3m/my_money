FactoryGirl.define do
  factory :account do |f|
    f.account_type 'savings'
    f.name 'New Account'
    f.bank 'New Bank'
    f.ticker 'TCK'
    f.term 30
    f.limit 3000
    f.interest_rate 5.67
    f.starting_balance 999
    f.starting_date '2014-01-01'
  end

  factory :account_invalid, parent: :account do |f|
    f.name nil
  end
end
