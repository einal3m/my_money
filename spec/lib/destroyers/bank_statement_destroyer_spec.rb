# frozen_string_literal: true

require 'rails_helper'
require_relative '../../../app/models/destroyers/bank_statement_destroyer'

describe BankStatementDestroyer do
  let(:transaction) { instance_double Transaction, reconciliation: nil }
  let(:bank_statement) { instance_double BankStatement, transactions: [transaction] }
  let(:destroyer) { described_class.new bank_statement }

  it 'deletes a bank statement' do
    allow(bank_statement).to receive(:destroy!)
    allow(transaction).to receive(:destroy!)

    destroyer.execute

    expect(bank_statement).to have_received(:destroy!)
    expect(transaction).to have_received(:destroy!)
  end

  describe 'errors' do
    let(:transaction) { instance_double Transaction, reconciliation: { id: 1 } }

    it 'doesnt delete if transaction has been reconciled' do
      expect do
        destroyer.execute
      end.to raise_error(MyMoneyError, 'Cannot delete a bank statement with reconciled transactions')
    end
  end
end
