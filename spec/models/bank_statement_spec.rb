require 'rails_helper'

RSpec.describe BankStatement, type: :model do
  it 'has a valid factory' do
    s = FactoryGirl.create(:bank_statement)

    expect(s).to be_valid
    expect(s).to be_a(BankStatement)
  end

  describe 'validations' do
    it 'is invalid without a date' do
      expect(FactoryGirl.build(:bank_statement, date: nil)).not_to be_valid
    end

    it 'is invalid without a transaction count' do
      expect(FactoryGirl.build(:bank_statement, transaction_count: nil)).not_to be_valid
    end

    it 'is invalid without a file name' do
      expect(FactoryGirl.build(:bank_statement, file_name: nil)).not_to be_valid
    end

    it 'is invalid without an acount' do
      expect(FactoryGirl.build(:bank_statement, account: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to an account' do
      a = FactoryGirl.create(:account)
      expect(FactoryGirl.create(:bank_statement, account: a).account).to eq(a)
    end
    it 'has many transactions' do
      bs = FactoryGirl.create(:bank_statement)
      FactoryGirl.create(:transaction, bank_statement: bs)
      FactoryGirl.create(:transaction, bank_statement: bs)
      expect(bs.transactions.length).to eq(2)
    end
  end
end
