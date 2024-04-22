# frozen_string_literal: true

#
#  CategoryType
#
#  id: int, primary key
#  name: string
#
class CategoryType < ApplicationRecord
  validates :name, presence: true
  has_many :categories, dependent: nil

  scope :income, -> { find_by(name: 'Income') }
  scope :expense, -> { find_by(name: 'Expense') }
  scope :transfer, -> { find_by(name: 'Transfer') }

  def code
    name
  end

  def editable?
    true
  end
end
