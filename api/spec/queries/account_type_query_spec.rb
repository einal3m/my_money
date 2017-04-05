require_relative '../../queries/account_type_query'

RSpec.describe AccountTypeQuery do
  describe 'execute' do
    it 'returns a hash of all account types with name and code' do
      account_types = AccountTypeQuery.new.execute

      expect(account_types[:account_types].length).to eq(3)
      expect(account_types[:account_types][0][:code]).to eq('savings')
      expect(account_types[:account_types][0][:name]).to eq('Savings')
      expect(account_types[:account_types][1][:code]).to eq('share')
      expect(account_types[:account_types][1][:name]).to eq('Share')
      expect(account_types[:account_types][2][:code]).to eq('loan')
      expect(account_types[:account_types][2][:name]).to eq('Loan')
    end
  end
end
