require 'rails_helper'
require 'lib/date_range'

RSpec.describe Lib::CategorySearch, type: :class do
  before :each do
    @ct = FactoryBot.create(:category_type, name: 'Expense')
    @c1 = FactoryBot.create(:category, category_type: @ct, name: 'B')
    @c2 = FactoryBot.create(:category, category_type: @ct, name: 'A')
    @sc = FactoryBot.create(:subcategory, category: @c1)

    @t1 = FactoryBot.create(:transaction, date: '2014-01-01', category: @c1, amount: 400, subcategory: nil)
    @t2 = FactoryBot.create(:transaction, date: '2014-01-02', category: @c1, subcategory: @sc, amount: 1000)
    @t3 = FactoryBot.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: 1200)
    @t4 = FactoryBot.create(:transaction, date: '2014-02-02', category: @c2, subcategory: nil, amount: 1500)
    @t5 = FactoryBot.create(:transaction, date: '2014-01-03', category: nil, subcategory: nil, amount: 500)
    @t6 = FactoryBot.create(:transaction, date: '2014-03-02', category: @c2, subcategory: nil)
    @t7 = FactoryBot.create(:transaction, date: '2014-03-03', category: nil, subcategory: nil)

    @dr = Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-02-28')
    @search = Lib::CategoryTypeSearch.new(date_range: @dr, category_type: @ct)
  end

  it 'returns transactions for the given category_type' do
    expect(@search.transactions).to eq([@t4, @t2, @t1])
  end

  it 'returns the sum of all transactions' do
    expect(@search.sum).to eq(2900) # 15+10+4
  end

  it 'returns a summary of all transactions by month' do
    expect(@search.month_totals).to eq([['Jan-14', 1400], ['Feb-14', 1500]])
  end

  it 'returns the sum per category and subcategory' do
    expect(@search.group_by(:category_id, :subcategory_id)).to eq([
      { sum: 1500, category_id: @c2.id, subcategory_id: nil },
      { sum: 1000, category_id: @c1.id, subcategory_id: @sc.id },
      { sum: 400, category_id: @c1.id, subcategory_id: nil }
    ])
  end

  it 'raises an error if group by parameters are not symbols' do
    expect { @search.group_by('not a symbol') }.to raise_error(ArgumentError)
  end
end
