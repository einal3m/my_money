require_relative 'serializer_class_methods'

module ModelSerializer
  def self.included(base)
    base.extend(SerializerClassMethods)
  end

  def initialize(models)
    @models = models
  end

  def serialize
    @models.map do |model|
      model.values.select do |key, _val|
        self.class.model_attributes.include? key
      end
    end
  end
end
