module ModelSerializer
  def self.included(base)
    base.extend(ClassMethods)
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

  module ClassMethods
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
end
