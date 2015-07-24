require 'rails_helper'

RSpec.describe TransactionType, type: :model do
  it 'Share Purchase' do
    transaction_type = TransactionType::SharePurchase.new
    expect(transaction_type.id).to eq(1)
    expect(transaction_type.name).to eq('Purchase')
  end

  it 'Share Dividend' do
    transaction_type = TransactionType::Dividend.new
    expect(transaction_type.id).to eq(2)
    expect(transaction_type.name).to eq('Dividend')
  end

  it 'Unit Price Update' do
    transaction_type = TransactionType::UnitPriceUpdate.new
    expect(transaction_type.id).to eq(3)
    expect(transaction_type.name).to eq('Unit Price Update')
  end

  it 'Share Sale' do
    transaction_type = TransactionType::ShareSale.new
    expect(transaction_type.id).to eq(4)
    expect(transaction_type.name).to eq('Sale')
  end

  it 'Bank Transaction' do
    transaction_type = TransactionType::BankTransaction.new
    expect(transaction_type.id).to eq(5)
    expect(transaction_type.name).to eq('Bank Transaction')
  end
end
