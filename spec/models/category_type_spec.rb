require 'rails_helper'
#
#  CategoryType
#
#  id: int, primary key
#  name: string
#
RSpec.describe CategoryType, type: :model do
  it 'has a valid factory' do
    ct = FactoryGirl.create(:category_type)

    expect(ct).to be_valid
    expect(ct).to be_a(CategoryType)
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryGirl.build(:category_type, name: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'has many categories' do
      expect(FactoryGirl.create(:category_type_with_categories, category_count: 2).categories.length).to eq(2)
    end
  end

  describe 'scopes' do
    it 'finds income category type' do
      FactoryGirl.create(:category_type, name: 'Income')
      expect(CategoryType.income.name).to eq('Income')
    end

    it 'finds expense category type' do
      FactoryGirl.create(:category_type, name: 'Expense')
      expect(CategoryType.expense.name).to eq('Expense')
    end

    it 'finds transfer category type' do
      FactoryGirl.create(:category_type, name: 'Transfer')
      expect(CategoryType.transfer.name).to eq('Transfer')
    end
  end
end
