# frozen_string_literal: true

class Budget < ApplicationRecord
  belongs_to :account

  validates :day_of_month, presence: true
  validates :day_of_month, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 31 }
  validates :amount, presence: true
end
