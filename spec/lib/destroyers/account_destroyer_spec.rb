require 'rails_helper'
require_relative '../../../app/models/destroyers/account_destroyer'

describe 'AccountDestroyer' do
  let(:account) { FactoryBot.create(:account) }
  let(:destroyer) { AccountDestroyer.new account }

  it 'deletes an account' do
    expect(account).to receive(:destroy!)
    destroyer.execute 
  end

  describe 'errors' do
    it 'doesnt delete if account has transactions' do
      FactoryBot.create(:transaction, account: account)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete an account that has transactions')
    end
  end
end
