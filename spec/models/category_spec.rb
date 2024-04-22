# frozen_string_literal: true

require 'rails_helper'
#
#  Category
#
#  id: int, primary key
#  name: string
#  category_type: string ('I', 'E' or 'T')
#

RSpec.describe Category do
  it 'has a valid factory' do
    c = FactoryBot.create(:category)

    expect(c).to be_valid
    expect(c).to be_a(described_class)
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryBot.build(:category, name: nil)).not_to be_valid
    end

    it 'is invalid without a category_type' do
      expect(FactoryBot.build(:category, category_type: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'has many subcategories' do
      c = FactoryBot.create(:category)
      FactoryBot.create(:subcategory, category: c)
      FactoryBot.create(:subcategory, category: c)

      expect(c.subcategories.length).to eq(2)
    end

    it 'has many transactions' do
      c = FactoryBot.create(:category)
      FactoryBot.create(:transaction, category: c)
      FactoryBot.create(:transaction, category: c)

      expect(c.transactions.length).to eq(2)
    end

    it 'has many patterns' do
      c = FactoryBot.create(:category)
      FactoryBot.create(:pattern, category: c)
      FactoryBot.create(:pattern, category: c)

      expect(c.patterns.length).to eq(2)
    end

    it 'belongs to category_type' do
      expect(FactoryBot.create(:category).category_type).to be_valid
    end
  end
end
