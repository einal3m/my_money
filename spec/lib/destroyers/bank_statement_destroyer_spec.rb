require 'rails_helper'
require 'destroyers/bank_statement_destroyer'

describe 'BankStatementDestroyer' do
  let(:transaction) { double :transaction, reconciliation: nil }
  let(:bank_statement) { double :bank_statement, transactions: [transaction] }
  let(:destroyer) { BankStatementDestroyer.new bank_statement }

  it 'deletes a bank statement' do
    expect(bank_statement).to receive(:destroy!)
    expect(transaction).to receive(:destroy!)
    destroyer.execute
  end

  describe 'errors' do
    let(:transaction) { double :transaction, reconciliation: { id: 1 } }

    it 'doesnt delete if transaction has been reconciled' do
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete a bank statement with reconciled transactions')
    end
  end
end
