# frozen_string_literal: true

module Lib
  class OfxParser < Lib::Parser
    STMTTRN = '<STMTTRN>'
    END_STMTTRN = '</STMTTRN>'
    MAPPINGS = {
      # 'TRNTYPE' => 'transaction_type',
      'DTPOSTED' => 'date',
      'TRNAMT' => 'amount',
      'FITID' => 'fitid',
      'MEMO' => 'memo'
    }.freeze

    def initialize(file)
      super()
      @file = file
    end

    def transactions
      @transactions ||= parse
    end

    private

    def parse
      ofx_content = @file.read

      ofx_array = if ofx_content[0..4] == '<?xml'
                    ofx_content.gsub!(/></m, ">\n<").gsub!(%r{</}m, "\n</").split("\n")
                  else
                    ofx_content.split(/\r\n|\n/)
                  end

      txn_array = []

      ofx_array.each_with_index do |ofx, i|
        txn_array << parse_txn(ofx_array, i) if ofx == STMTTRN
      end

      txn_array
    end

    def parse_txn(ofx_array, index)
      transaction = ImportedTransaction.new
      while ofx_array[index] != END_STMTTRN
        code, value = parse_line(ofx_array[index])
        build_transaction(transaction, code, value)
        index += 1
      end
      transaction
    end

    def parse_line(line)
      results = line.match(/^<(.*)>(.*)$/)
      return ['', nil] if !results || results.length < 2

      results[1, 2]
    end

    def build_transaction(transaction, code, value)
      case code
      when 'TRNAMT'
        transaction.amount = parse_amount value
      when 'DTPOSTED'
        transaction.date = parse_iso_date value
      else
        transaction.send(:"#{MAPPINGS[code]}=", value) if MAPPINGS.key?(code)
      end
    end
  end
end
