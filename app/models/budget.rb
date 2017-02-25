class Budget < ActiveRecord::Base
  validates :account_id, presence: true
  validates :day_of_month, presence: true
  validates :amount, presence: true
  validates :credit, presence: true
end
