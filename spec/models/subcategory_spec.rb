require 'rails_helper'

RSpec.describe Subcategory, type: :model do
  it 'has a valid factory' do
    s = FactoryGirl.create(:subcategory)

    expect(s).to be_valid
    expect(s).to be_a(Subcategory)
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryGirl.build(:subcategory, name: nil)).not_to be_valid
    end

    it 'it is invalid without a category' do
      expect(FactoryGirl.build(:subcategory, category: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to category' do
      c = FactoryGirl.create(:category)
      expect(FactoryGirl.create(:subcategory, category: c).category).to eq(c)
    end

    it 'has many transactions' do
      s = FactoryGirl.create(:subcategory)
      FactoryGirl.create(:transaction, category: s.category, subcategory: s)
      FactoryGirl.create(:transaction, category: s.category, subcategory: s)

      expect(s.transactions.length).to eq(2)
    end

    it 'has many patterns' do
      s = FactoryGirl.create(:subcategory)
      FactoryGirl.create(:pattern, subcategory: s)
      FactoryGirl.create(:pattern, subcategory: s)

      expect(s.patterns.length).to eq(2)
    end
  end
end
