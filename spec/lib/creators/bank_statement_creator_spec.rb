# frozen_string_literal: true

require 'rails_helper'
require_relative '../../../app/models/creators/bank_statement_creator'

describe 'BankStatementCreator' do
  let(:file_name) { 'file.ofx' }
  let(:account) { FactoryBot.create(:account) }
  let(:bank_statement_params) { { file_name:, account_id: account.id } }
  let(:transaction_params) do
    [
      { date: '2015-01-01', amount: 500, account_id: account.id },
      { date: '2015-02-01', amount: 520, account_id: account.id }
    ]
  end

  it 'creates a bank statement with transactions' do
    creator = BankStatementCreator.new bank_statement_params, transaction_params
    bank_statement = creator.execute

    expect(bank_statement.account_id).to eq(account.id)
    expect(bank_statement.date).to eq(Time.zone.today)
    expect(bank_statement.file_name).to eq(file_name)
    expect(bank_statement.transactions.length).to eq(2)
    expect(bank_statement.transaction_count).to eq(2)

    expect(bank_statement.transactions.first.account).to eq(account)
    expect(bank_statement.transactions.first.date).to eq(Date.parse('2015-01-01'))
    expect(bank_statement.transactions.first.amount).to eq(500)
    expect(bank_statement.transactions.first.transaction_type).to be_a(TransactionType::BankTransaction)

    expect(bank_statement.transactions.second.account).to eq(account)
    expect(bank_statement.transactions.second.date).to eq(Date.parse('2015-02-01'))
    expect(bank_statement.transactions.second.amount).to eq(520)
    expect(bank_statement.transactions.second.transaction_type).to be_a(TransactionType::BankTransaction)
  end

  describe 'valid params' do
    it 'is invalid if bank statement params are invalid' do
      bank_statement_params.delete(:file_name)
      creator = BankStatementCreator.new bank_statement_params, transaction_params
      expect { creator.execute }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'is invalid if transaction params are invalid' do
      transaction_params[1].delete(:date)
      creator = BankStatementCreator.new bank_statement_params, transaction_params
      expect { creator.execute }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'is invalid if there are extra bank statement params' do
      bank_statement_params[:extra_param] = 'something'
      creator = BankStatementCreator.new bank_statement_params, transaction_params
      expect { creator.execute }.to raise_error(ArgumentError)
    end

    it 'is invalid if there are extra transaction params' do
      transaction_params[1][:extra_param] = 'something'
      creator = BankStatementCreator.new bank_statement_params, transaction_params
      expect { creator.execute }.to raise_error(ArgumentError)
    end
  end
end
