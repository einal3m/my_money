class MyMoney
  route('category_types') do |r|
    r.get do
      CategoryTypeQuery.new.execute
    end
  end
end
