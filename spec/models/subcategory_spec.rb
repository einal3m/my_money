# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Subcategory do
  it 'has a valid factory' do
    s = FactoryBot.create(:subcategory)

    expect(s).to be_valid
    expect(s).to be_a(described_class)
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryBot.build(:subcategory, name: nil)).not_to be_valid
    end

    it 'is invalid without a category' do
      expect(FactoryBot.build(:subcategory, category: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to category' do
      c = FactoryBot.create(:category)
      expect(FactoryBot.create(:subcategory, category: c).category).to eq(c)
    end

    it 'has many transactions' do
      s = FactoryBot.create(:subcategory)
      FactoryBot.create(:transaction, category: s.category, subcategory: s)
      FactoryBot.create(:transaction, category: s.category, subcategory: s)

      expect(s.transactions.length).to eq(2)
    end

    it 'has many patterns' do
      s = FactoryBot.create(:subcategory)
      FactoryBot.create(:pattern, subcategory: s)
      FactoryBot.create(:pattern, subcategory: s)

      expect(s.patterns.length).to eq(2)
    end
  end
end
