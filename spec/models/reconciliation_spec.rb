# frozen_string_literal: true

require 'rails_helper'

#
# Reconciliation
#
# id, int primary key
# account_id, int foreign key
# statement_date, date
# statement_balance, decimal
# reconciled, boolean
#

RSpec.describe Reconciliation do
  it 'has a valid factory' do
    r = FactoryBot.create(:reconciliation)

    expect(r).to be_valid
    expect(r).to be_a(described_class)
  end

  describe 'validations' do
    it 'is invalid without an account' do
      expect(FactoryBot.build(:reconciliation, account: nil)).not_to be_valid
    end

    it 'is invalid without a statement date' do
      expect(FactoryBot.build(:reconciliation, statement_date: nil)).not_to be_valid
    end

    it 'is invalid without a statement balance' do
      expect(FactoryBot.build(:reconciliation, statement_balance: nil)).not_to be_valid
    end
  end

  describe 'relationships' do
    it 'belongs to account' do
      a = FactoryBot.create(:account)
      expect(FactoryBot.create(:reconciliation, account: a).account).to eq(a)
    end

    it 'has many transactions' do
      r = FactoryBot.create(:reconciliation)
      FactoryBot.create(:transaction, reconciliation: r)
      FactoryBot.create(:transaction, reconciliation: r)

      expect(r.transactions.length).to eq(2)
    end
  end

  describe 'initialize' do
    it 'sets reconciled to false by default' do
      expect(FactoryBot.create(:reconciliation).reconciled).to be(false)
    end
  end
end
