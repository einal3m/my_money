require_relative '../../models/category'
require_relative '../../serializers/category_serializer'

RSpec.describe CategorySerializer do
  describe 'serialize (array)' do
    it 'returns an array of hashes of category attributes' do
      category = Category.create(
        category_type_id: 2,
        name: 'My Category'
      )

      serialized_categories = CategorySerializer.new([category]).serialize

      expect(serialized_categories.length).to eq(1)

      expect(serialized_categories[0].keys.sort).to eq([:id, :category_type_id, :name].sort)

      expect(serialized_categories[0][:id]).to eq(category.id)
      expect(serialized_categories[0][:category_type_id]).to eq(2)
      expect(serialized_categories[0][:name]).to eq('My Category')
    end
  end
end
