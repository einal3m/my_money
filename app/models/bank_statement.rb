# frozen_string_literal: true

class BankStatement < ApplicationRecord
  # validations
  validates :date, presence: true
  validates :transaction_count, presence: true
  validates :file_name, presence: true

  # relationships
  belongs_to :account
  has_many :transactions, dependent: :restrict_with_exception
end
