module Lib
  class Enum
    def self.inherited(other)
      @classes ||= []
      @classes << other
    end

    def self.all
      @classes.map(&:new)
    end
  end
end
