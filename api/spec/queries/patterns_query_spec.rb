require_relative '../../models/pattern'
require_relative '../../queries/patterns_query'
require_relative '../../serializers/pattern_serializer'
require_relative '../factories/factory'

RSpec.describe PatternsQuery do
  describe 'execute' do
    it 'returns the serialized patterns' do
      account = Factory.create_account
      pattern = Factory.create_pattern(account: account)
      _pattern_for_different_account = Factory.create_pattern

      serializer = instance_double PatternSerializer
      expect(PatternSerializer).to receive(:new).with([pattern]).and_return(serializer)
      expect(serializer).to receive(:serialize).and_return([{ id: 1, notes: 'notes' }])

      expect(PatternsQuery.new(account).execute).to eq(
        patterns: [{ id: 1, notes: 'notes' }]
      )
    end
  end
end
