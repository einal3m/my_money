# frozen_string_literal: true

require 'rails_helper'
require_relative '../../app/models/lib/date_range'

RSpec.describe Lib::CategorySearch, type: :class do
  let(:share_account) { FactoryBot.create(:account, account_type: AccountType::Share.new) }
  let(:dr) { Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-02-28') }
  let(:loan_account) { FactoryBot.create(:account, account_type: AccountType::Loan.new) }
  let(:c) { FactoryBot.create(:category) }

  def setup_data # rubocop:disable Metrics/AbcSize
    t1 = FactoryBot.create(:transaction, date: '2014-01-01', amount: 400, category: c, subcategory: nil)
    t2 = FactoryBot.create(:transaction, account: loan_account, date: '2014-01-02', category: t1.category,
                                         subcategory: nil, amount: 1000)
    t3 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: -1200)
    t4 = FactoryBot.create(:transaction, date: '2014-02-02', category: t1.category, subcategory: nil, amount: 1500)
    t5 = FactoryBot.create(:transaction, date: '2014-01-03', category: nil, subcategory: nil, amount: 500)
    t6 = FactoryBot.create(:transaction, date: '2014-03-02', category: t1.category, subcategory: nil)
    t7 = FactoryBot.create(:transaction, date: '2014-03-03', category: nil, subcategory: nil)
    t8 = FactoryBot.create(:transaction, account: share_account, date: '2014-01-13', category: t1.category,
                                         subcategory: nil)
    t9 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: -1200)
    t10 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: 1200,
                                          matching_transaction: t9)

    [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10]
  end

  it 'sets default values if no arguments given' do
    setup_data
    search = described_class.new({})
    expect(search.category).to be_nil
  end

  it 'returns transactions for savings accounts for the given category' do
    t1, t2, _, t4, = setup_data
    search = described_class.new(date_range: dr, category: t1.category)
    expect(search.transactions).to eq([t4, t2, t1])
  end

  it 'returns the sum of all transactions' do
    t1, = setup_data
    search = described_class.new(date_range: dr, category: t1.category)
    expect(search.sum).to eq(2900) # 15+10+4
  end

  it 'returns a summary of all transactions by month' do
    t1, = setup_data
    search = described_class.new(date_range: dr, category: t1.category)
    expect(search.month_totals).to eq([['Jan-14', 1400], ['Feb-14', 1500]])
  end

  it 'returns transactions with no category if category not specified' do
    _, _, t3, _, t5, = setup_data
    search = described_class.new(date_range: dr, category: nil)
    expect(search.transactions).to eq([t5, t3])
  end

  it 'returns transactions with positive amounts if income category type provided' do
    _, _, _, _, t5, = setup_data
    income_category_type = FactoryBot.create(:category_type, name: 'Income')
    search = described_class.new(date_range: dr, category: nil, category_type: income_category_type)
    expect(search.transactions).to eq([t5])
  end

  it 'returns transactions with negative amounts if expense category type provided' do
    _, _, t3, = setup_data
    expense_category_type = FactoryBot.create(:category_type, name: 'Expense')
    search = described_class.new(date_range: dr, category: nil, category_type: expense_category_type)
    expect(search.transactions).to eq([t3])
  end
end
