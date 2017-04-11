require_relative '../../queries/accounts_query'
require_relative '../../commands/account_commands'
require_relative '../factories/factory'
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
          name: 'my account',
          account_type: 'share',
          ticker: 'MEL'
        }
        command = instance_double AccountCommands
        expect(AccountCommands).to receive(:new).and_return(command)
        expect(command).to receive(:create).with(params).and_return(11)

        post '/accounts', JSON.generate(account: params)

        expect(JSON.parse(last_response.body)).to eq('id' => 11)
        expect(last_response.status).to eq(201)
      end
    end

    context 'on error' do
      it 'calls the create account command and returns 422' do
        account = Account.new
        account.errors.add(:ticker, 'is not present')
        exception = Sequel::ValidationFailed.new(account)

        invalid_params = {
          name: 'my account',
          account_type: 'share'
        }
        command = instance_double AccountCommands
        expect(AccountCommands).to receive(:new).and_return(command)
        expect(command).to receive(:create).with(invalid_params).and_raise(exception)

        post '/accounts', JSON.generate(account: invalid_params)

        expect(JSON.parse(last_response.body)).to eq('errors' => ['ticker is not present'])
        expect(last_response.status).to eq(422)
      end
    end
  end

  describe 'PUT accounts/:id' do
    it 'calls the update account command and returns 204' do
      account = Factory.create_account
      params = { name: 'updated name' }

      command = instance_double AccountCommands
      expect(AccountCommands).to receive(:new).and_return(command)
      expect(command).to receive(:update).with(account, params)

      put "/accounts/#{account.id}", JSON.generate(account: params)

      expect(last_response.status).to eq(204)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if account does not exist' do
      expect(AccountCommands).not_to receive(:new)

      put '/accounts/11', account: { 'name' => 'updated name' }

      expect(last_response.status).to eq(404)
    end
  end

  describe 'DELETE accounts/:id' do
    it 'calls the delete account command and returns 200' do
      account = Factory.create_account

      command = instance_double AccountCommands
      expect(AccountCommands).to receive(:new).and_return(command)
      expect(command).to receive(:delete).with(account)

      delete "/accounts/#{account.id}"

      expect(last_response.status).to eq(200)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if account does not exist' do
      expect(AccountCommands).not_to receive(:new)

      delete '/accounts/11'

      expect(last_response.status).to eq(404)
    end
  end
end
