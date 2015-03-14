module Lib
  class OfxParser
    STMTTRN = '<STMTTRN>'
    END_STMTTRN = '</STMTTRN>'
    MAPPINGS = {
      'TRNTYPE' => 'transaction_type',
      'DTPOSTED' => 'date',
      'TRNAMT' => 'amount',
      'FITID' => 'fitid',
      'MEMO' => 'memo'
    }

    def initialize(file)
      @file = file
    end

    def transactions
      @transactions ||= parse
    end

    private

    def parse
      ofx_array = @file.read.split(/\r\n/)
      txn_array = []

      ofx_array.each_with_index do |ofx, i|
        txn_array << parse_txn(ofx_array, i) if (ofx == STMTTRN)
      end

      txn_array
    end

    def parse_txn(ofx_array, i)
      transaction = ImportedTransaction.new
      while (ofx_array[i] != END_STMTTRN)
        code, value = parse_line(ofx_array[i])
        build_transaction(transaction, code, value)
        i += 1
      end
      transaction
    end

    def parse_line(line)
      line.match(/^<(.*)>(.*)$/)[1, 2]
    end

    def build_transaction(transaction, code, value)
      case code
      when 'TRNAMT'
        transaction.amount = parse_amount value
      when 'DTPOSTED'
        transaction.date = parse_date value
      else
        transaction.send("#{MAPPINGS[code]}=", value) if MAPPINGS.key?(code)
      end
    end

    def parse_date(date)
      Date.iso8601(date)
    end

    def parse_amount(amount)
      ((amount.gsub(/\s+/, '').to_f) * 100).round
    end
  end
end
