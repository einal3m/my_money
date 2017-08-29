require_relative 'enum_serializer'

class DateRangeOptionSerializer
  include EnumSerializer

  attributes :id, :name, :from_date, :to_date, :default, :custom?
end
