require_relative '../factories/factory'

RSpec.describe Pattern, type: :model do
  let(:account) { Factory.create_account }
  let(:category) { Factory.create_category }
  let(:subcategory) { Factory.create_subcategory(category: category) }

  let(:match_text) { 'pattern text' }
  let(:notes) { 'pattern notes' }

  let(:pattern) do
    Pattern.new(
      account: account,
      match_text: match_text,
      category: category,
      subcategory: subcategory,
      notes: notes
    )
  end

  describe 'validations' do
    context 'is invalid without an account' do
      let(:account) { nil }
      it('should have error') do
        expect(pattern.valid?).to eq(false)
        expect(pattern.errors).to eq(account: ['is not present'])
      end
    end

    context 'is invalid without a category' do
      let(:category) { nil }
      it('should have error') do
        expect(pattern.valid?).to eq(false)
        expect(pattern.errors).to eq(category: ['is not present'])
      end
    end

    context 'is invalid without match_text' do
      let(:match_text) { nil }
      it('should have error') do
        expect(pattern.valid?).to eq(false)
        expect(pattern.errors).to eq(match_text: ['is not present'])
      end
    end

    context 'is valid without a subcategory' do
      let(:subcategory) { nil }
      it('should not have error') do
        expect(pattern.valid?).to eq(true)
      end
    end

    context 'is valid without notes' do
      let(:notes) { nil }
      it('should not have error') do
        expect(pattern.valid?).to eq(true)
      end
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      expect(pattern.account).to eq(account)
    end

    it 'has a category' do
      expect(pattern.category).to eq(category)
    end

    it 'has a subcategory' do
      expect(pattern.subcategory).to eq(subcategory)
    end
  end
end
