class DateRangeOption < ActiveRecord::Base

	# validations
	validates :description, presence: true
	validates :klass, presence: true
	validates :order, presence: true
	validates :default, :inclusion => {:in => [true, false]}
	validates :default, uniqueness: true, if: :default

	# scopes
  scope :default, -> { find_by(default: true) }

end
