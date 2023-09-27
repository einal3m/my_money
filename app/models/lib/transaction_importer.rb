# frozen_string_literal: true

module Lib
  class TransactionImporter
    def initialize(account, data_file)
      @account = account
      @data_file = data_file
    end

    def execute
      @transactions = parser.transactions

      @transactions.each do |t|
        build_transaction(t)
      end

      @transactions
    end

    def parser
      @data_file.original_filename.end_with?('ofx') ? Lib::OfxParser.new(@data_file) : Lib::CsvParser.new(@data_file)
    end

    def build_transaction(txn)
      txn.account = @account
      txn.duplicate = Transaction.exists?(account: @account, date: txn.date, memo: txn.memo, amount: txn.amount)
      txn.import = !txn.duplicate
      apply_patterns(txn)
    end

    def apply_patterns(transaction)
      Pattern.where(account_id: @account.id).find_each do |pattern|
        next unless transaction.memo.downcase.include? pattern.match_text.downcase

        allocate_transaction(transaction, pattern)
        break
      end
    end

    def allocate_transaction(transaction, pattern)
      transaction.category_id = pattern.category_id
      transaction.subcategory_id = pattern.subcategory_id
      transaction.notes = pattern.notes
    end
  end
end
