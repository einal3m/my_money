class DateRangeOptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :default

  def name
    object.description
  end
end
