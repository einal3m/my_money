FactoryGirl.define do

  factory :account do |f|
    f.name "New Account" 
    f.bank "New Bank" 
    f.starting_balance 9.99
    f.starting_date "2014-01-01"
  end

  factory :account_invalid, parent: :account do |f|
    f.name nil
  end

end
