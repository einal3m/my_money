require 'rails_helper'

RSpec.describe Budget, type: :model do
  it 'has a valid factory' do
    a = FactoryGirl.create(:budget)

    expect(a).to be_valid
    expect(a).to be_a(Budget)
  end

  describe 'validations' do
    it 'is invalid without an account' do
      expect(FactoryGirl.build(:budget, account_id: nil)).not_to be_valid
    end

    it 'is invalid without a day of month' do
      expect(FactoryGirl.build(:budget, day_of_month: nil)).not_to be_valid
    end

    it 'is valid with a day of month between 1 and 31' do
      expect(FactoryGirl.build(:budget, day_of_month: 0)).not_to be_valid
      expect(FactoryGirl.build(:budget, day_of_month: 1)).to be_valid
      expect(FactoryGirl.build(:budget, day_of_month: 31)).to be_valid
      expect(FactoryGirl.build(:budget, day_of_month: 32)).not_to be_valid
    end

    it 'is valid without a description' do
      expect(FactoryGirl.build(:budget, description: nil)).to be_valid
    end

    it 'is invalid without an amount' do
      expect(FactoryGirl.build(:budget, amount: nil)).not_to be_valid
    end

    it 'is invalid without credit flag' do
      expect(FactoryGirl.build(:budget, credit: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      a = FactoryGirl.create(:account)
      expect(FactoryGirl.create(:budget, account: a).account).to eq(a)
    end
  end
end
