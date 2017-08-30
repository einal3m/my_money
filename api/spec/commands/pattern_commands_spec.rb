require_relative '../../commands/pattern_commands'
require_relative '../../models/pattern'
require_relative '../factories/factory'

RSpec.describe PatternCommands do
  let(:account) { Factory.create_account }
  let(:category) { Factory.create_category }
  let(:subcategory) { Factory.create_subcategory(category: category) }

  describe 'create' do
    context 'with valid params' do
      it 'creates the pattern and returns the id' do
        params = {
          account_id: account.id,
          match_text: 'my text',
          category_id: category.id,
          subcategory_id: subcategory.id,
          notes: 'my notes'
        }

        id = PatternCommands.new.create(params)

        pattern = Pattern.first
        expect(pattern.id).to eq(id)
        expect(pattern.account).to eq(account)
        expect(pattern.match_text).to eq('my text')
        expect(pattern.category).to eq(category)
        expect(pattern.subcategory).to eq(subcategory)
        expect(pattern.notes).to eq('my notes')
      end
    end
  end

  describe 'update' do
    context 'with valid params' do
      it 'updates the pattern' do
        pattern = Factory.create_pattern
        params = { notes: 'new notes', subcategory_id: subcategory.id }

        PatternCommands.new.update(pattern, params)

        updated_pattern = Pattern[pattern.id]
        expect(updated_pattern.notes).to eq('new notes')
      end
    end
  end

  describe 'delete' do
    it 'deletes the pattern' do
      pattern = Factory.create_pattern

      PatternCommands.new.delete(pattern)

      expect(Pattern[pattern.id]).to be_nil
    end
  end
end
