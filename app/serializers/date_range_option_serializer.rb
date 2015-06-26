class DateRangeOptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :default, :from_date, :to_date, :custom

  def custom
    object.custom?
  end
end
