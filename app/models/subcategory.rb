# frozen_string_literal: true

class Subcategory < ApplicationRecord
  belongs_to :category
  has_many :transactions, dependent: nil
  has_many :patterns, dependent: nil

  validates :name, presence: true
end
