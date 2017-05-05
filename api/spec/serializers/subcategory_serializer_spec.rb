require_relative '../../models/subcategory'
require_relative '../../serializers/subcategory_serializer'
require_relative '../factories/factory'

RSpec.describe SubcategorySerializer do
  describe 'serialize (array)' do
    it 'returns an array of hashes of subcategory attributes' do
      subcategory = Factory.create_subcategory(name: 'My Subcategory')

      serialized_subcategories = SubcategorySerializer.new([subcategory]).serialize

      expect(serialized_subcategories.length).to eq(1)

      expect(serialized_subcategories[0].keys.sort).to eq([:id, :category_id, :name].sort)
      expect(serialized_subcategories[0][:id]).to eq(subcategory.id)
      expect(serialized_subcategories[0][:category_id]).to eq(subcategory.category.id)
      expect(serialized_subcategories[0][:name]).to eq('My Subcategory')
    end
  end
end
