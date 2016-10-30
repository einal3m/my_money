require 'rails_helper'

RSpec.describe AccountType, type: :model do
  it 'Savings' do
    account_type = AccountType::Savings.new
    expect(account_type.id).to eq(1)
    expect(account_type.name).to eq('Savings')
    expect(account_type.code).to eq('savings')
  end
  it 'Share' do
    account_type = AccountType::Share.new
    expect(account_type.id).to eq(2)
    expect(account_type.name).to eq('Share')
    expect(account_type.code).to eq('share')
  end
  it 'Home Loan' do
    account_type = AccountType::HomeLoan.new
    expect(account_type.id).to eq(3)
    expect(account_type.name).to eq('Home Loan')
    expect(account_type.code).to eq('home_loan')
  end
end
