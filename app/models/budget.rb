class Budget < ActiveRecord::Base
  belongs_to :account

  validates :account_id, presence: true
  validates :day_of_month, presence: true
  validates :day_of_month, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 31 }
  validates :amount, presence: true
end
