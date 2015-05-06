require 'rails_helper'
#
#  AccountType
#
#  id: int, primary key
#  name: string
#
RSpec.describe AccountType, type: :model do
  it 'has a valid factory' do
    ct = FactoryGirl.create(:account_type)

    expect(ct).to be_valid
    expect(ct).to be_a(AccountType)
  end

  describe 'validations' do
    it 'is invalid without a name' do
      expect(FactoryGirl.build(:account_type, name: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'has many accounts' do
      account_type = FactoryGirl.create(:account_type)
      FactoryGirl.create(:account, account_type: account_type)
      FactoryGirl.create(:account, account_type: account_type)

      expect(account_type.accounts.length).to eq(2)
    end
  end
end
