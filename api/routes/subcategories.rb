class MyMoney
  route('subcategories') do |r|
    r.is do
      # GET subcategories
      r.get do
        SubcategoriesQuery.new.execute
      end

      # POST subcategories
      r.post do
        id = SubcategoryCommands.new.create(request_body(r)[:subcategory])
        r.halt(201, { 'Location' => "#{request.path}/#{id}" }, id: id)
      end
    end

    r.is ':subcategory_id' do |subcategory_id|
      subcategory = Subcategory.with_pk!(subcategory_id)

      # PUT subcategories/:subcategory_id
      r.put do
        SubcategoryCommands.new.update(subcategory, request_body(r)[:subcategory])
        r.halt(204, '')
      end

      # DELETE subcategories/:subcategory_id
      r.delete do
        SubcategoryCommands.new.delete(subcategory)
        r.halt(200, '')
      end
    end
  end
end
