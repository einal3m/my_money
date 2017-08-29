require_relative '../../queries/date_range_options_query'

RSpec.describe DateRangeOptionsQuery do
  describe 'execute' do
    it 'returns a hash of all date range options with date ranges and names' do
      date_range_options = DateRangeOptionsQuery.new.execute[:date_range_options]

      expect(date_range_options.length).to eq(6)

      expect(date_range_options[0]).to include(id: 1, name: 'Current Month', default: true, custom?: false)
      expect(date_range_options[0]).to have_key(:from_date)
      expect(date_range_options[0]).to have_key(:to_date)
      expect(date_range_options[1]).to include(id: 2, name: 'Custom Dates', default: false, custom?:  true)
      expect(date_range_options[2]).to include(id: 3, name: 'Current Financial Year', default: false, custom?:  false)
      expect(date_range_options[3]).to include(id: 4, name: 'Previous Financial Year', default: false, custom?:  false)
      expect(date_range_options[4]).to include(id: 5, name: 'Last 90 Days', default: false, custom?:  false)
      expect(date_range_options[5]).to include(id: 6, name: 'Last 12 Months', default: false, custom?:  false)
    end
  end
end
