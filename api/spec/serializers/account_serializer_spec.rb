require_relative '../../models/account'
require_relative '../../models/account_type'
require_relative '../../serializers/account_serializer'

RSpec.describe AccountSerializer do
  describe 'serialize (array)' do
    it 'returns an array of hashes of account attributes' do
      account1 = Account.create(
        name: 'My Account',
        bank: 'My Bank',
        account_type: AccountType::SAVINGS,
        starting_balance: 2,
        starting_date: '2016-12-19',
        ticker: 'MMM',
        limit: 3,
        term: 4,
        interest_rate: 1.11
      )

      serialized_accounts = AccountSerializer.new([account1]).serialize

      expect(serialized_accounts.length).to eq(1)

      expect(serialized_accounts[0].keys.sort).to eq([
        :id,
        :name,
        :bank,
        :account_type,
        :starting_balance,
        :starting_date,
        :ticker,
        :limit,
        :term,
        :interest_rate
      ].sort)

      expect(serialized_accounts[0][:id]).to eq(account1.id)
      expect(serialized_accounts[0][:name]).to eq('My Account')
      expect(serialized_accounts[0][:bank]).to eq('My Bank')
      expect(serialized_accounts[0][:account_type]).to eq('savings')
      expect(serialized_accounts[0][:starting_balance]).to eq(2)
      expect(serialized_accounts[0][:starting_date]).to eq(Date.parse('2016-12-19'))
      expect(serialized_accounts[0][:ticker]).to eq('MMM')
      expect(serialized_accounts[0][:limit]).to eq(3)
      expect(serialized_accounts[0][:term]).to eq(4)
      expect(serialized_accounts[0][:interest_rate].to_f).to eq(1.11)
    end
  end
end
