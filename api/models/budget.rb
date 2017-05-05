class Budget < Sequel::Model
  plugin :validation_helpers

  many_to_one :account

  def validate
    super
    validates_presence [:account, :day_of_month, :amount]
    validate_day_of_month
  end

  def validate_day_of_month
    return if day_of_month.nil?
    errors.add(:day_of_month, 'must be between 1 and 31') if day_of_month < 1
    errors.add(:day_of_month, 'must be between 1 and 31') if day_of_month > 31
  end
end
