class DateRangeOption
  def klass
    'Lib::' + self.class.to_s.split('::').last + 'DateRange'
  end

  def default
    false
  end

  def date_range
    @date_range ||= Lib.const_get(klass).new
  end

  def from_date
    date_range.from_date
  end

  def to_date
    date_range.to_date
  end

  def custom?
    false
  end

  class CurrentMonth < DateRangeOption
    def id
      1
    end

    def order
      1
    end

    def name
      'Current Month'
    end

    def default
      true
    end
  end

  class Custom < DateRangeOption
    def id
      2
    end

    def order
      2
    end

    def name
      'Custom Dates'
    end

    def custom?
      true
    end
  end

  class CurrentFinancialYear < DateRangeOption
    def id
      3
    end

    def order
      3
    end

    def name
      'Current Financial Year'
    end
  end

  class PreviousFinancialYear < DateRangeOption
    def id
      4
    end

    def order
      4
    end

    def name
      'Previous Financial Year'
    end
  end

  class Last90Days < DateRangeOption
    def id
      5
    end

    def order
      5
    end

    def name
      'Last 90 Days'
    end
  end

  class Last12Months < DateRangeOption
    def id
      6
    end

    def order
      6
    end

    def name
      'Last 12 Months'
    end
  end
end
