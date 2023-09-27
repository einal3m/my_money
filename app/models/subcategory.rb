# frozen_string_literal: true

class Subcategory < ApplicationRecord
  belongs_to :category
  has_many :transactions, dependent: :restrict_with_exception
  has_many :patterns, dependent: :restrict_with_exception

  validates :name, presence: true
end
