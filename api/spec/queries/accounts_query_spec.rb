require_relative '../../models/account'
require_relative '../../queries/accounts_query'
require_relative '../../models/account_type'
require_relative '../../serializers/account_serializer'
require_relative '../factories/factory'

RSpec.describe AccountsQuery do
  describe 'execute' do
    it 'returns the serialized Accounts' do
      account = Factory.create_account(name: 'My Account', account_type: AccountType::SAVINGS)

      serializer = instance_double AccountSerializer
      expect(AccountSerializer).to receive(:new).with([account]).and_return(serializer)
      expect(serializer).to receive(:serialize).and_return([{ id: 1, name: 'My Account' }])

      expect(AccountsQuery.new.execute).to eq(
        accounts: [{ id: 1, name: 'My Account' }]
      )
    end
  end
end
