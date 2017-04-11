require_relative '../../queries/category_type_query'

RSpec.describe CategoryTypeQuery do
  describe 'execute' do
    it 'returns a hash of all account types with name and code' do
      category_types = CategoryTypeQuery.new.execute[:category_types]

      expect(category_types.length).to eq(3)

      expect(category_types[0][:id]).to eq(1)
      expect(category_types[0][:code]).to eq('transfer')
      expect(category_types[0][:name]).to eq('Transfer')
      expect(category_types[0][:editable?]).to eq(false)

      expect(category_types[1][:id]).to eq(2)
      expect(category_types[1][:code]).to eq('income')
      expect(category_types[1][:name]).to eq('Income')
      expect(category_types[1][:editable?]).to eq(true)

      expect(category_types[2][:id]).to eq(3)
      expect(category_types[2][:code]).to eq('expense')
      expect(category_types[2][:name]).to eq('Expense')
      expect(category_types[2][:editable?]).to eq(true)
    end
  end
end
