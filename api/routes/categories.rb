class MyMoney
  route('categories') do |r|
    r.is do
      r.get do
        CategoriesQuery.new.execute
      end

      r.post do
        id = CategoryCommands.new.create(request_body(r)[:category])
        r.halt(201, { 'Location' => "#{request.path}/#{id}" }, id: id)
      end
    end

    r.is ':id' do |id|
      category = Category.with_pk!(id)

      r.put do
        CategoryCommands.new.update(category, request_body(r)[:category])
        r.halt(204, '')
      end

      r.delete do
        CategoryCommands.new.delete(category)
        r.halt(200, '')
      end
    end
  end
end
