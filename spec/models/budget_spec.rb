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
end
