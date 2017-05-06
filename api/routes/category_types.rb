class MyMoney
  route('category_types') do |r|
    # GET category_types
    r.get do
      CategoryTypeQuery.new.execute
    end
  end
end
