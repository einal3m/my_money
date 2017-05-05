class MyMoney
  route('subcategories') do |r|
    r.is do
      r.get do
        SubcategoriesQuery.new.execute
      end

      r.post do
        id = SubcategoryCommands.new.create(request_body(r)[:subcategory])
        r.halt(201, { 'Location' => "#{request.path}/#{id}" }, id: id)
      end
    end

    r.is ':id' do |id|
      subcategory = Subcategory.with_pk!(id)

      r.put do
        SubcategoryCommands.new.update(subcategory, request_body(r)[:subcategory])
        r.halt(204, '')
      end

      r.delete do
        SubcategoryCommands.new.delete(subcategory)
        r.halt(200, '')
      end
    end
  end
end
