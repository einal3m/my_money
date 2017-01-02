require 'rails_helper'
require 'lib/date_range'

RSpec.describe Lib::CategorySearch, type: :class do
  before :each do
    @share_account = FactoryGirl.create(:account, account_type: AccountType::Share.new)
    @loan_account = FactoryGirl.create(:account, account_type: AccountType::Loan.new)
    @c = FactoryGirl.create(:category)
    @t1 = FactoryGirl.create(:transaction, date: '2014-01-01', amount: 400, category: @c, subcategory: nil)
    @t2 = FactoryGirl.create(:transaction, account: @loan_account, date: '2014-01-02', category: @t1.category, subcategory: nil, amount: 1000)
    @t3 = FactoryGirl.create(:transaction, date: '2014-01-01', category: nil, subcategory: nil, amount: -1200)
    @t4 = FactoryGirl.create(:transaction, date: '2014-02-02', category: @t1.category, subcategory: nil, amount: 1500)
    @t5 = FactoryGirl.create(:transaction, date: '2014-01-03', category: nil, subcategory: nil, amount: 500)
    @t6 = FactoryGirl.create(:transaction, date: '2014-03-02', category: @t1.category, subcategory: nil)
    @t7 = FactoryGirl.create(:transaction, date: '2014-03-03', category: nil, subcategory: nil)
    @t8 = FactoryGirl.create(:transaction, account: @share_account, date: '2014-01-13', category: @t1.category, subcategory: nil)

    @dr = Lib::CustomDateRange.new(from_date: '2014-01-01', to_date: '2014-02-28')
  end

  it 'sets default values if no arguments given' do
    search = Lib::CategorySearch.new({})
    expect(search.category).to be_nil
  end

  it 'returns transactions for savings accounts for the given category' do
    search = Lib::CategorySearch.new(date_range: @dr, category: @t1.category)
    expect(search.transactions).to eq([@t4, @t2, @t1])
  end

  it 'returns the sum of all transactions' do
    search = Lib::CategorySearch.new(date_range: @dr, category: @t1.category)
    expect(search.sum).to eq(2900) # 15+10+4
  end

  it 'returns a summary of all transactions by month' do
    search = Lib::CategorySearch.new(date_range: @dr, category: @t1.category)
    expect(search.month_totals).to eq([['Jan-14', 1400], ['Feb-14', 1500]])
  end

  it 'returns transactions with no category if category not specified' do
    search = Lib::CategorySearch.new(date_range: @dr, category: nil)
    expect(search.transactions).to eq([@t5, @t3])
  end

  it 'returns transactions with positive amounts if income category type provided' do
    income_category_type = FactoryGirl.create(:category_type, name: 'Income')
    search = Lib::CategorySearch.new(date_range: @dr, category: nil, category_type: income_category_type)
    expect(search.transactions).to eq([@t5])
  end

  it 'returns transactions with negative amounts if expense category type provided' do
    expense_category_type = FactoryGirl.create(:category_type, name: 'Expense')
    search = Lib::CategorySearch.new(date_range: @dr, category: nil, category_type: expense_category_type)
    expect(search.transactions).to eq([@t3])
  end
end
