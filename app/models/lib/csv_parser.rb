# frozen_string_literal: true

require 'csv'

module Lib
  class CsvParser < Lib::Parser
    def initialize(file)
      @file = file
    end

    def transactions
      @transactions ||= parse
    end

    private

    def parse
      txn_array = []

      CSV.parse(@file.read, headers: true, header_converters: :symbol) do |row|
        transaction = ImportedTransaction.new
        transaction.date = parse_date row[:date]
        transaction.memo = row[:description]
        transaction.amount = parse_debit(row[:debit]) || parse_credit(row[:credit])
        txn_array << transaction
      end

      txn_array
    end
  end
end
