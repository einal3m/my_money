require_relative '../lib/enum'

class TransactionType < Lib::Enum
  def code
    binding.pry
    option.to_s
  end

  def to_underscore!
    gsub!(/(.)([A-Z])/,'\1_\2')
    downcase!
  end

  def to_underscore
    dup.tap { |s| s.to_underscore! }
  end

  class SharePurchase < TransactionType
    def id
      1
    end

    def name
      'Purchase'
    end
  end

  class Dividend < TransactionType
    def id
      2
    end

    def name
      'Dividend'
    end
  end

  class UnitPriceUpdate < TransactionType
    def id
      3
    end

    def name
      'Unit Price Update'
    end
  end

  class ShareSale < TransactionType
    def id
      4
    end

    def name
      'Sale'
    end
  end

  class BankTransaction < TransactionType
    def id
      5
    end

    def name
      'Bank Transaction'
    end
  end
end
