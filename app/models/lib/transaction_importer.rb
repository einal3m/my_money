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

    def build_transaction(t)
      t.account = @account
      t.duplicate = Transaction.exists?(account: @account, date: t.date, memo: t.memo, amount: t.amount)
      t.import = !t.duplicate
      apply_patterns(t)
    end

    def apply_patterns(transaction)
      Pattern.where(account_id: @account.id).each do |pattern|
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
