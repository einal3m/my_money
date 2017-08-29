require_relative '../lib/date_range'

class DateRangeOptionsQuery
  def execute
    {
      date_range_options: DateRangeOptionSerializer.new(DateRangeOption.all).serialize
    }
  end
end
