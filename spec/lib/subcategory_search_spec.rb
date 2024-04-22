# frozen_string_literal: true

require 'rails_helper'
require_relative '../../app/models/lib/date_range'

RSpec.describe Lib::SubcategorySearch, type: :class do
  let(:share_account) { FactoryBot.create(:account, account_type: AccountType::Share.new) }
  let(:loan_account) { FactoryBot.create(:account, account_type: AccountType::Loan.new) }
  let(:sc) { FactoryBot.create(:subcategory) }
  let(:c) { sc.category }
  let(:dr) { Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-02-28') }

  def setup_data # rubocop:disable Metrics/AbcSize
    t1 = FactoryBot.create(:transaction, date: '2014-01-01', category: c, amount: 4, subcategory: sc)
    t2 = FactoryBot.create(:transaction, date: '2014-01-02', category: c, subcategory: nil, amount: 10)
    t3 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: 12)
    t4 = FactoryBot.create(:transaction, date: '2014-02-02', category: c, subcategory: nil, amount: 15)
    t5 = FactoryBot.create(:transaction, account: loan_account, date: '2014-01-03', category: c, subcategory: sc,
                                         amount: 5)
    t6 = FactoryBot.create(:transaction, date: '2014-03-02', category: c, subcategory: nil)
    t7 = FactoryBot.create(:transaction, date: '2014-03-03', category: c, subcategory: sc)
    t8 = FactoryBot.create(:transaction, account: share_account, date: '2014-01-13', category: c, subcategory: sc)

    [t1, t2, t3, t4, t5, t6, t7, t8]
  end

  it 'sets default values if no arguments given' do
    setup_data

    search = described_class.new({})

    expect(search.category).to be_nil
    expect(search.subcategory).to be_nil
  end

  it 'returns transactions for the given category' do
    t1, _, _, _, t5, = setup_data
    search = described_class.new(date_range: dr, category: c, subcategory: sc)
    expect(search.transactions).to eq([t5, t1])
  end

  it 'returns transactions with no subcategory if subcategory not specified' do
    _, t2, _, t4, = setup_data
    search = described_class.new(date_range: dr, category: c)
    expect(search.transactions).to eq([t4, t2])
  end

  it 'returns the sum of all transactions' do
    setup_data
    search = described_class.new(date_range: dr, category: c, subcategory: sc)
    expect(search.sum).to eq(9) # 5+4
  end

  it 'returns a summary of all transactions by month' do
    setup_data
    search = described_class.new(date_range: dr, category: c, subcategory: sc)
    expect(search.month_totals).to eq([['Jan-14', 9], ['Feb-14', 0]])
  end
end
