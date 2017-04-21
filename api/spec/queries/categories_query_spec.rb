require_relative '../../queries/categories_query'
require_relative '../../serializers/category_serializer'
require_relative '../factories/factory'

RSpec.describe CategoriesQuery do
  describe 'execute' do
    it 'returns the serialized categories' do
      category = Factory.create_category(name: 'My New Category', category_type_id: 3)

      serializer = instance_double CategorySerializer
      expect(CategorySerializer).to receive(:new).with([category]).and_return(serializer)
      expect(serializer).to receive(:serialize)
        .and_return([{ id: 1, category_type_id: 3, name: 'My New Category' }])

      expect(CategoriesQuery.new.execute).to eq(
        categories: [{ id: 1, category_type_id: 3, name: 'My New Category' }]
      )
    end
  end
end
