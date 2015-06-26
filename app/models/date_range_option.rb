class DateRangeOption < ClassyEnum::Base
  include ActiveModel::Serialization

  def klass
    'Lib::' + option.to_s.camelize
  end

  def default
    false
  end

  def date_range
    @date_range ||= klass.constantize.new
  end

  class CurrentMonthDateRange < DateRangeOption
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

  class CustomDateRange < DateRangeOption
    def id
      2
    end

    def order
      2
    end

    def name
      'Custom Dates'
    end
  end

  class CurrentFinancialYearDateRange < DateRangeOption
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

  class PreviousFinancialYearDateRange < DateRangeOption
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

  class Last90DaysDateRange < DateRangeOption
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

  class Last12MonthsDateRange < DateRangeOption
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
