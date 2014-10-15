class DateRangeOption < ActiveRecord::Base

	# validations
	validates :description, presence: true
	validates :klass, presence: true
  validate :klass_must_be_a_valid_class
 
  def klass_must_be_a_valid_class
    if self.klass.nil? || !DateRange.valid?(self.klass)
      errors.add(self.klass, "not a valid class")
    end
  end

	# scopes
  scope :default, -> { find_by(default: true) }

  # callbacks
  before_validation :set_default_and_order, on: :create
  before_validation :set_default, on: :update, if: :default

  # when creating a new record, set default to false unless it is the first record
  # and set the order of this record to the last
  def set_default_and_order
  	self.default = (DateRangeOption.all.length == 0)
  	self.order = (DateRangeOption.maximum(:order) || 0) + 1
  end

  # when setting default to true, update the existing default record to false
  def set_default
  	current_default = DateRangeOption.default
  	current_default.update_column(:default, false)
  end
end
