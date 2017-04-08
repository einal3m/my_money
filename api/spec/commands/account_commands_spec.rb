require_relative '../../commands/account_commands'
require_relative '../../models/account'

RSpec.describe AccountCommands do
  describe 'execute' do
    context 'with valid params' do
      it 'creates the account and returns the id' do
        params = {
          name: 'my account',
          account_type: 'share',
          ticker: 'MEL'
        }

        id = AccountCommands.new(params).create

        account = Account.first
        expect(account.id).to eq(id)
        expect(account.name).to eq('my account')
        expect(account.account_type).to eq('share')
        expect(account.ticker).to eq('MEL')
      end
    end

    context 'with invalid params' do
      it 'creates the account' do
        invalid_params = {
          name: 'my account',
          account_type: 'share'
        }

        expect do
          AccountCommands.new(invalid_params).create
        end.to raise_error(Sequel::ValidationFailed, 'ticker is not present')
      end
    end
  end
end
