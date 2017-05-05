require_relative '../factories/factory'

RSpec.describe Subcategory, type: :model do
  let(:name) { 'My Subcategory' }
  let(:category_id) { 2 }

  let(:category) { Factory.create_category }

  let(:subcategory) do
    Subcategory.new(
      name: name,
      category: category
    )
  end

  describe 'validations' do
    context 'is invalid without a name' do
      let(:name) { nil }
      it('should have error') do
        expect(subcategory.valid?).to eq(false)
        expect(subcategory.errors).to eq(name: ['is not present'])
      end
    end

    context 'is invalid without a category_id' do
      let(:category) { nil }
      it('should have error') do
        expect(subcategory.valid?).to eq(false)
        expect(subcategory.errors).to eq(category: ['is not present'])
      end
    end
  end

  describe 'relationships' do
    it 'belongs to category' do
      category = Factory.create_category
      subcategory = Subcategory.create(name: 'My Subcategory', category: category)

      expect(subcategory.category).to eq(category)
    end

    # it 'has many transactions' do
    #   s = FactoryGirl.create(:subcategory)
    #   FactoryGirl.create(:transaction, category: s.category, subcategory: s)
    #   FactoryGirl.create(:transaction, category: s.category, subcategory: s)
    #
    #   expect(s.transactions.length).to eq(2)
    # end
    #
    # it 'has many patterns' do
    #   s = FactoryGirl.create(:subcategory)
    #   FactoryGirl.create(:pattern, subcategory: s)
    #   FactoryGirl.create(:pattern, subcategory: s)
    #
    #   expect(s.patterns.length).to eq(2)
    # end
  end
end
