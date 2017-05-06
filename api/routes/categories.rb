class MyMoney
  route('categories') do |r|
    r.is do
      # GET categories
      r.get do
        CategoriesQuery.new.execute
      end

      # POST categories
      r.post do
        id = CategoryCommands.new.create(request_body(r)[:category])
        r.halt(201, { 'Location' => "#{request.path}/#{id}" }, id: id)
      end
    end

    r.is ':category_id' do |category_id|
      category = Category.with_pk!(category_id)

      # PUT categories/:category_id
      r.put do
        CategoryCommands.new.update(category, request_body(r)[:category])
        r.halt(204, '')
      end

      # DELETE categories/:category_id
      r.delete do
        CategoryCommands.new.delete(category)
        r.halt(200, '')
      end
    end
  end
end
