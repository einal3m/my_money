FactoryGirl.define do

  factory :subcategory do |f|
    f.name "New Subategory" 
    category
  end

  factory :subcategory_invalid, parent: :subcategory do |f|
    f.name nil
  end

end