# frozen_string_literal: true

require 'rails_helper'
require_relative '../../app/models/lib/date_range'

RSpec.describe Lib::CategoryTypeSearch, type: :class do
  let(:ct) { FactoryBot.create(:category_type, name: 'Expense') }
  let(:c_one) { FactoryBot.create(:category, category_type: ct, name: 'B') }
  let(:c_two) { FactoryBot.create(:category, category_type: ct, name: 'A') }
  let(:sc) { FactoryBot.create(:subcategory, category: c_one) }
  let(:dr) { Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-02-28') }
  let(:search) { described_class.new(date_range: dr, category_type: ct) }

  def setup_data
    t1 = FactoryBot.create(:transaction, date: '2014-01-01', category: c_one, amount: 400, subcategory: nil)
    t2 = FactoryBot.create(:transaction, date: '2014-01-02', category: c_one, subcategory: sc, amount: 1000)
    t3 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: 1200)
    t4 = FactoryBot.create(:transaction, date: '2014-02-02', category: c_two, subcategory: nil, amount: 1500)
    t5 = FactoryBot.create(:transaction, date: '2014-01-03', category: nil, subcategory: nil, amount: 500)
    t6 = FactoryBot.create(:transaction, date: '2014-03-02', category: c_two, subcategory: nil)
    t7 = FactoryBot.create(:transaction, date: '2014-03-03', category: nil, subcategory: nil)

    [t1, t2, t3, t4, t5, t6, t7]
  end

  it 'returns transactions for the given category_type' do
    t1, t2, _, t4, = setup_data
    expect(search.transactions).to eq([t4, t2, t1])
  end

  it 'returns the sum of all transactions' do
    setup_data
    expect(search.sum).to eq(2900) # 15+10+4
  end

  it 'returns a summary of all transactions by month' do
    setup_data
    expect(search.month_totals).to eq([['Jan-14', 1400], ['Feb-14', 1500]])
  end

  it 'returns the sum per category and subcategory' do
    setup_data
    expect(search.group_by(:category_id, :subcategory_id)).to eq(
      [
        { sum: 1500, category_id: c_two.id,
          subcategory_id: nil },
        { sum: 1000, category_id: c_one.id,
          subcategory_id: sc.id },
        { sum: 400, category_id: c_one.id,
          subcategory_id: nil }
      ]
    )
  end

  it 'raises an error if group by parameters are not symbols' do
    expect { search.group_by('not a symbol') }.to raise_error(ArgumentError)
  end
end
