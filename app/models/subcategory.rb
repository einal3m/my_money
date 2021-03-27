# frozen_string_literal: true

class Subcategory < ApplicationRecord
  belongs_to :category
  has_many :transactions
  has_many :patterns

  validates :name, presence: true
  validates :category_id, presence: true
end
