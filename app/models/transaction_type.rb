# frozen_string_literal: true

class TransactionType < ClassyEnum::Base
  include ActiveModel::Serialization

  def code
    option.to_s
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
