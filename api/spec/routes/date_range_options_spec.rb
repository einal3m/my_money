require_relative '../../queries/date_range_options_query'
require 'rack/test'

RSpec.describe '/date_range_options' do
  include Rack::Test::Methods

  def app
    MyMoney.app
  end

  it 'calls the date range option query and returns the result' do
    query = instance_double DateRangeOptionsQuery
    expect(DateRangeOptionsQuery).to receive(:new).and_return(query)
    expect(query).to receive(:execute).and_return(date_range_options: ['one'])

    get '/date_range_options'

    expect(last_response.status).to eq(200)
    expect(JSON.parse(last_response.body)).to eq('date_range_options' => ['one'])
  end
end
