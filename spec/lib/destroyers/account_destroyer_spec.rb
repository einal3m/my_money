require 'rails_helper'
require 'destroyers/account_destroyer'

describe 'AccountDestroyer' do
  let(:account) { FactoryGirl.create(:account) }
  let(:destroyer) { AccountDestroyer.new account }

  it 'deletes an account' do
    expect(account).to receive(:destroy!)
    destroyer.execute 
  end

  describe 'errors' do
    it 'doesnt delete if account has transactions' do
      FactoryGirl.create(:transaction, account: account)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete an account that has transactions')
    end
  end
end
