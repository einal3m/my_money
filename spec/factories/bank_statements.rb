FactoryGirl.define do
  factory :bank_statement do
    date "2014-03-03"
    account
    transaction_count 5
    file_name 'sample.qif'
  end
end
