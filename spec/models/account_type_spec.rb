require 'rails_helper'
#
#  AccountType
#
#  id: int, primary key
#  name: string
#
RSpec.describe AccountType, type: :model do
  it 'Savings' do
    account_type = AccountType::Savings.new
    expect(account_type.id).to eq(1)
    expect(account_type.name).to eq('Savings')
  end
  it 'Share' do
    account_type = AccountType::Share.new
    expect(account_type.id).to eq(2)
    expect(account_type.name).to eq('Share')
  end
end
