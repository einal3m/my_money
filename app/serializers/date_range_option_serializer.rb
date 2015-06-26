class DateRangeOptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :default, :from_date, :to_date

  def from_date
    object.date_range.from_date
  end

  def to_date
    object.date_range.to_date
  end
end
