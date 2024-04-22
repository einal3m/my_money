# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :subcategories, dependent: :destroy
  has_many :transactions, dependent: nil
  has_many :patterns, dependent: nil
  belongs_to :category_type

  validates :name, presence: true
  validates :category_type_id, numericality: true
end
