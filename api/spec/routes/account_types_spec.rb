require_relative '../../my_money'
require 'rack/test'

RSpec.describe '/account_types' do
  include Rack::Test::Methods

  def app
    MyMoney.app
  end

  it 'calls the account type query and returns the result' do
    query = instance_double AccountTypeQuery
    expect(AccountTypeQuery).to receive(:new).and_return(query)
    expect(query).to receive(:execute).and_return(account_types: ['one'])

    get '/account_types'

    expect(last_response.status).to eq(200)
    expect(JSON.parse(last_response.body)).to eq('account_types' => ['one'])
  end
end
