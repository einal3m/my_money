# frozen_string_literal: true

class BankStatement < ApplicationRecord
  # validations
  validates :account_id, presence: true
  validates :date, presence: true
  validates :transaction_count, presence: true
  validates :file_name, presence: true

  # relationships
  belongs_to :account
  has_many :transactions
end
