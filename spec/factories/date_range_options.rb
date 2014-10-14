# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :date_range_option do
    description "MyString"
    klass "MyString"
    sequence(:order) { |n| n }
    default false
  end
end
