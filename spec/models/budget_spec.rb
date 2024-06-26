# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Budget do
  it 'has a valid factory' do
    a = FactoryBot.create(:budget)

    expect(a).to be_valid
    expect(a).to be_a(described_class)
  end

  describe 'validations' do
    it 'is invalid without an account' do
      expect(FactoryBot.build(:budget, account_id: nil)).not_to be_valid
    end

    it 'is invalid without a day of month' do
      expect(FactoryBot.build(:budget, day_of_month: nil)).not_to be_valid
    end

    it 'is valid with a day of month between 1 and 31' do
      expect(FactoryBot.build(:budget, day_of_month: 0)).not_to be_valid
      expect(FactoryBot.build(:budget, day_of_month: 1)).to be_valid
      expect(FactoryBot.build(:budget, day_of_month: 31)).to be_valid
      expect(FactoryBot.build(:budget, day_of_month: 32)).not_to be_valid
    end

    it 'is valid without a description' do
      expect(FactoryBot.build(:budget, description: nil)).to be_valid
    end

    it 'is invalid without an amount' do
      expect(FactoryBot.build(:budget, amount: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      a = FactoryBot.create(:account)
      expect(FactoryBot.create(:budget, account: a).account).to eq(a)
    end
  end
end
