require 'rails_helper'
#
#  Category
#
#  id: int, primary key
#  name: string
#  category_type: string ('I', 'E' or 'T')
#

RSpec.describe Category, type: :model do
  it 'has a valid factory' do
    c = FactoryGirl.create(:category)

    expect(c).to be_valid
    expect(c).to be_a(Category)
  end

  describe 'validations' do
    it 'it is invalid without a name' do
      expect(FactoryGirl.build(:category, name: nil)).not_to be_valid
    end

    it 'it is invalid without a category_type' do
      expect(FactoryGirl.build(:category, category_type: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'has many subcategories' do
      c = FactoryGirl.create(:category)
      FactoryGirl.create(:subcategory, category: c)
      FactoryGirl.create(:subcategory, category: c)

      expect(c.subcategories.length).to eq(2)
    end

    it 'has many transactions' do
      c = FactoryGirl.create(:category)
      FactoryGirl.create(:transaction, category: c)
      FactoryGirl.create(:transaction, category: c)

      expect(c.transactions.length).to eq(2)
    end

    it 'has many patterns' do
      c = FactoryGirl.create(:category)
      FactoryGirl.create(:pattern, category: c)
      FactoryGirl.create(:pattern, category: c)

      expect(c.patterns.length).to eq(2)
    end

    it 'belongs to category_type' do
      expect(FactoryGirl.create(:category).category_type).to be_valid
    end
  end

  describe 'callbacks' do
    it 'will not delete a Category with transactions' do
      category = FactoryGirl.create(:category)
      FactoryGirl.create(:transaction, category: category)
      expect(category.destroy).to be_falsey
      expect(category.errors[:transactions][0]).to eq('Category has transactions')
    end

    it 'will not delete a Category with patterns' do
      category = FactoryGirl.create(:category)
      FactoryGirl.create(:pattern, category: category)
      expect(category.destroy).to be_falsey
      expect(category.errors[:patterns][0]).to eq('Category has patterns')
    end

    it 'will not delete a Category with patterns' do
      category = FactoryGirl.create(:category)
      FactoryGirl.create(:subcategory, category: category)
      expect(category.destroy).to be_falsey
      expect(category.errors[:subcategories][0]).to eq('Category has subcategories')
    end
  end
end
