require_relative '../../queries/category_type_query'
require 'rack/test'

RSpec.describe '/category_types' do
  include Rack::Test::Methods

  def app
    MyMoney.app
  end

  it 'calls the category type query and returns the result' do
    query = instance_double CategoryTypeQuery
    expect(CategoryTypeQuery).to receive(:new).and_return(query)
    expect(query).to receive(:execute).and_return(category_types: ['one'])

    get '/category_types'

    expect(last_response.status).to eq(200)
    expect(JSON.parse(last_response.body)).to eq('category_types' => ['one'])
  end
end
