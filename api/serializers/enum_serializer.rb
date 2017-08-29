require_relative 'serializer_class_methods'

module EnumSerializer
  def self.included(base)
    base.extend(SerializerClassMethods)
  end

  def initialize(models)
    @models = models
  end

  def serialize
    @models.map do |model|
      result = {}
      self.class.model_attributes.map do |attribute|
        result[attribute] = model.send(attribute)
      end
      result
    end
  end
end
