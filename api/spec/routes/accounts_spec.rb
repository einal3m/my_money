require_relative '../../queries/accounts_query'
require_relative '../../commands/account_commands'
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

  describe 'POST accounts' do
    context 'on success' do
      it 'calls the create account command and returns 201' do
        params = {
          'name' => 'my account',
          'account_type' => 'share',
          'ticker' => 'MEL'
        }
        command = instance_double AccountCommands
        expect(AccountCommands).to receive(:new).with(params).and_return(command)
        expect(command).to receive(:create).and_return(11)

        post '/accounts', account: params

        expect(last_response.status).to eq(201)
      end
    end

    context 'on error' do
      it 'calls the create account command and returns 422' do
        account = Account.new
        account.errors.add(:ticker, 'is not present')
        exception = Sequel::ValidationFailed.new(account)

        invalid_params = {
          'name' => 'my account',
          'account_type' => 'share'
        }
        command = instance_double AccountCommands
        expect(AccountCommands).to receive(:new).with(invalid_params).and_return(command)
        expect(command).to receive(:create).and_raise(exception)

        post '/accounts', account: invalid_params

        expect(last_response.status).to eq(422)
        expect(JSON.parse(last_response.body)).to eq('errors' => ['ticker is not present'])
      end
    end
  end
end
