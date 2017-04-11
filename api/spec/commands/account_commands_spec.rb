require_relative '../../commands/account_commands'
require_relative '../../models/account'
require_relative '../factories/factory'

RSpec.describe AccountCommands do
  describe 'create' do
    context 'with valid params' do
      it 'creates the account and returns the id' do
        params = {
          name: 'my account',
          account_type: 'share',
          ticker: 'MEL'
        }

        id = AccountCommands.new.create(params)

        account = Account.first
        expect(account.id).to eq(id)
        expect(account.name).to eq('my account')
        expect(account.account_type).to eq('share')
        expect(account.ticker).to eq('MEL')
      end
    end

    context 'with invalid params' do
      it 'raises an exception' do
        invalid_params = {
          name: 'my account',
          account_type: 'share'
        }

        expect do
          AccountCommands.new.create(invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'ticker is not present')
      end
    end
  end

  describe 'update' do
    context 'with valid params' do
      it 'updates the account' do
        account = Factory.create_account
        params = { name: 'new account name' }

        AccountCommands.new.update(account, params)

        account = Account[account.id]
        expect(account.name).to eq('new account name')
      end
    end

    context 'with invalid params' do
      it 'raises an exception' do
        account = Factory.create_account
        invalid_params = { starting_balance: 'invalid' }

        expect do
          AccountCommands.new.update(account, invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'starting_balance is not a number')
      end
    end
  end

  describe 'delete' do
    it 'deletes the account' do
      account = Factory.create_account

      AccountCommands.new.delete(account)

      expect(Account[account.id]).to be_nil
    end
  end
end
