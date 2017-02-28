FactoryGirl.define do
  factory :budget do
    account
    description "MyString"
    day_of_month 1
    amount 1
  end
end