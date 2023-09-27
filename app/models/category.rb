# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :subcategories, dependent: :restrict_with_exception
  has_many :transactions, dependent: :restrict_with_exception
  has_many :patterns, dependent: :restrict_with_exception
  belongs_to :category_type

  validates :name, presence: true
  validates :category_type_id, numericality: true
end
