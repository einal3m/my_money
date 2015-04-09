#
#  Category
#
#  id: int, primary key
#  name: string
#  category_type: string ('I', 'E' or 'T')
#
class Category < ActiveRecord::Base
  has_many :subcategories
  has_many :transactions
  has_many :patterns
  belongs_to :category_type

  validates :name, presence: true
  validates :category_type_id, presence: true, numericality: true

  before_destroy :validate_for_destroy

  def validate_for_destroy
    validate_no_subcategories
    validate_no_transactions
    validate_no_patterns
    errors.blank?
  end

  private

  def validate_no_subcategories
    errors.add(:subcategories, 'Category has subcategories') if subcategories.length > 0
  end

  def validate_no_transactions
    errors.add(:transactions, 'Category has transactions') if transactions.length > 0
  end

  def validate_no_patterns
    errors.add(:patterns, 'Category has patterns') if patterns.length > 0
  end
end
