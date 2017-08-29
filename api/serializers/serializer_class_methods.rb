module SerializerClassMethods
  attr_accessor :model_attributes

  def attributes(*names)
    @model_attributes = []
    names.each { |name| add_attribute(name) }
  end

  private

  def add_attribute(name)
    @model_attributes << name
  end
end
