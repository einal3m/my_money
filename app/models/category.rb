class Category < ActiveRecord::Base
  has_many :subcategories
  has_many :transactions
  has_many :patterns
  belongs_to :category_type

  validates :name, presence: true
  validates :category_type_id, presence: true, numericality: true
end
