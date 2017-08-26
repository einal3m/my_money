require_relative '../../lib/date_range'
require_relative '../../models/date_range_option'

RSpec.describe DateRangeOption, type: :model do
  before :each do
    @date_range_option = DateRangeOption::CurrentMonth.new
  end

  it 'has an id' do
    expect(@date_range_option.id).to eq(1)
  end

  it 'has an order' do
    expect(@date_range_option.order).to eq(1)
  end

  it 'has a klass' do
    expect(@date_range_option.klass).to eq('Lib::CurrentMonthDateRange')
  end

  it 'has a date range object' do
    expect(@date_range_option.date_range).to be_a(Lib::CurrentMonthDateRange)
  end

  it 'has a name' do
    expect(@date_range_option.name).to eq('Current Month')
  end

  it 'has custom? method' do
    expect(@date_range_option.custom?).to be_falsey
    custom_date_range = DateRangeOption::Custom.new
    expect(custom_date_range.custom?).to be_truthy
  end
end
