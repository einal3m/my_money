require_relative '../../queries/accounts_query'
require 'rack/test'

RSpec.describe '/accounts' do
  include Rack::Test::Methods

  def app
    MyMoney.app
  end

  describe 'GET accounts' do
    it 'calls the accounts query and returns the result' do
      query = instance_double AccountsQuery
      expect(AccountsQuery).to receive(:new).and_return(query)
      expect(query).to receive(:execute).and_return(accounts: ['one'])

      get '/accounts'

      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq('accounts' => ['one'])
    end
  end
end
