RSpec.describe Category, type: :model do
  let(:name) { 'My Category' }
  let(:category_type_id) { CategoryType.expense[:id] }

  let(:category) do
    Category.new(
      name: name,
      category_type_id: category_type_id
    )
  end

  describe 'validations' do
    context 'is invalid without a name' do
      let(:name) { nil }
      it('should have error') do
        expect(category.valid?).to eq(false)
        expect(category.errors).to eq(name: ['is not present'])
      end
    end

    context 'is invalid without a category_type' do
      let(:category_type_id) { nil }
      it('should have error') do
        expect(category.valid?).to eq(false)
        expect(category.errors).to eq(category_type_id: ['is not present'])
      end
    end
  end

  # describe 'relationships' do
  #   it 'has many subcategories' do
  #     c = FactoryGirl.create(:category)
  #     FactoryGirl.create(:subcategory, category: c)
  #     FactoryGirl.create(:subcategory, category: c)
  #
  #     expect(c.subcategories.length).to eq(2)
  #   end
  #
  #   it 'has many transactions' do
  #     c = FactoryGirl.create(:category)
  #     FactoryGirl.create(:transaction, category: c)
  #     FactoryGirl.create(:transaction, category: c)
  #
  #     expect(c.transactions.length).to eq(2)
  #   end
  #
  #   it 'has many patterns' do
  #     c = FactoryGirl.create(:category)
  #     FactoryGirl.create(:pattern, category: c)
  #     FactoryGirl.create(:pattern, category: c)
  #
  #     expect(c.patterns.length).to eq(2)
  #   end
  #
  #   it 'belongs to category_type' do
  #     expect(FactoryGirl.create(:category).category_type).to be_valid
  #   end
  # end
end
