require_relative '../factories/factory'
require_relative '../../models/pattern'
require_relative '../../serializers/pattern_serializer'

RSpec.describe PatternSerializer do
  describe 'serialize (array)' do
    it 'returns an array of hashes of pattern attributes' do
      account = Factory.create_account
      category = Factory.create_category
      subcategory = Factory.create_subcategory(category: category)

      pattern = Factory.create_pattern(
        account: account,
        match_text: 'my match text',
        category: category,
        subcategory: subcategory,
        notes: 'my notes'
      )

      serialized_patterns = PatternSerializer.new([pattern]).serialize

      expect(serialized_patterns.length).to eq(1)

      expect(serialized_patterns[0].keys.sort).to eq(
        [:id, :account_id, :match_text, :notes, :category_id, :subcategory_id].sort
      )

      expect(serialized_patterns[0][:id]).to eq(pattern.id)
      expect(serialized_patterns[0][:account_id]).to eq(account.id)
      expect(serialized_patterns[0][:match_text]).to eq('my match text')
      expect(serialized_patterns[0][:notes]).to eq('my notes')
      expect(serialized_patterns[0][:category_id]).to eq(category.id)
      expect(serialized_patterns[0][:subcategory_id]).to eq(subcategory.id)
    end
  end
end
