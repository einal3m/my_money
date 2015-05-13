require 'rails_helper'

RSpec.describe TransactionType, type: :model do
  it 'has a valid factory' do
    ct = FactoryGirl.create(:transaction_type)

    expect(ct).to be_valid
    expect(ct).to be_a(TransactionType)
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryGirl.build(:transaction_type, name: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'has many transactions' do
      transaction_type = FactoryGirl.create(:transaction_type)
      FactoryGirl.create(:transaction, transaction_type: transaction_type)
      FactoryGirl.create(:transaction, transaction_type: transaction_type)

      expect(transaction_type.transactions.length).to eq(2)
    end
  end
end
