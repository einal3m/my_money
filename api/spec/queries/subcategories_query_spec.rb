require_relative '../../queries/subcategory_query'
require_relative '../../serializers/subcategory_serializer'
require_relative '../factories/factory'

RSpec.describe SubcategoriesQuery do
  describe 'execute' do
    it 'returns the serialized subcategories' do
      subcategory = Factory.create_subcategory(name: 'My New Subcategory', category_id: 3)

      serializer = instance_double SubcategorySerializer
      expect(SubcategorySerializer).to receive(:new).with([subcategory]).and_return(serializer)
      expect(serializer).to receive(:serialize)
        .and_return([{ id: 1, category_id: 3, name: 'My New Subcategory' }])

      expect(SubcategoriesQuery.new.execute).to eq(
        subcategories: [{ id: 1, category_id: 3, name: 'My New Subcategory' }]
      )
    end
  end
end
