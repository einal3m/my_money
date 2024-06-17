# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AccountType do
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

  it 'Loan' do
    account_type = AccountType::Loan.new
    expect(account_type.id).to eq(3)
    expect(account_type.name).to eq('Loan')
    expect(account_type.code).to eq('loan')
  end
end
