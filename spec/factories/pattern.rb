FactoryGirl.define do

  factory :pattern do |f|
  	account
  	f.match_text "New Pattern"
  	category
  	subcategory
  end

  factory :pattern_invalid, parent: :pattern do |f|
    f.match_text nil
  end

end
