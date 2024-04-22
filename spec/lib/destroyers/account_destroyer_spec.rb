# frozen_string_literal: true

require 'rails_helper'
require_relative '../../../app/models/destroyers/account_destroyer'

describe 'AccountDestroyer' do
  let!(:account) { FactoryBot.create(:account) }
  let(:destroyer) { AccountDestroyer.new account }

  it 'deletes an account' do
    expect { destroyer.execute }.to change(Account, :count).by(-1)
    expect { account.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end

  describe 'errors' do
    it 'doesnt delete if account has transactions' do
      FactoryBot.create(:transaction, account:)
      expect { destroyer.execute }.to raise_error(MyMoneyError, 'Cannot delete an account that has transactions')
    end
  end
end
