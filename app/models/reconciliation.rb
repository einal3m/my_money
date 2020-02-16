# frozen_string_literal: true

#
# Reconciliation
#
# id, int primary key
# account_id, int foreign key
# statement_date, date
# statement_balance, decimal
# reconciled, boolean
#
class Reconciliation < ApplicationRecord
  # validations
  validates :account_id, presence: true
  validates :statement_date, presence: true
  validates :statement_balance, presence: true

  # relationships
  belongs_to :account
  has_many :transactions

  # set reconciled to false by default when created
  after_initialize :defaults, unless: :persisted?

  def defaults
    self.reconciled = false
  end
end
