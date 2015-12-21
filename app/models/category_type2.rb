class CategoryType2 < ClassyEnum::Base
  include ActiveModel::Serialization

  def code
    option.to_s
  end

  def editable?
    true
  end

  class Transfer < CategoryType2
    def id
      1
    end

    def name
      'Transfer'
    end

    def editable?
      false
    end
  end

  class Income < CategoryType2
    def id
      2
    end

    def name
      'Income'
    end
  end

  class Expense < CategoryType2
    def id
      3
    end

    def name
      'Expense'
    end
  end
end
