FactoryGirl.define do

  factory :category do |f|
    f.name "New Category" 
    category_type
  end

  factory :category_invalid, parent: :category do |f|
    f.name nil
  end

end