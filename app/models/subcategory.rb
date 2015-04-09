#
#  Subcategory
#
#  id: int, primary key
#  name: string
#  category_id: int, foreign key
#
class Subcategory < ActiveRecord::Base
  # model relationships
  belongs_to :category
  has_many :transactions
  has_many :patterns

  # validations
  validates :name, presence: true
  validates :category_id, presence: true

  before_destroy :validate_for_destroy

  def validate_for_destroy
    validate_no_transactions
    validate_no_patterns
    errors.blank?
  end

  private

  def validate_no_transactions
    errors.add(:transactions, 'Subcategory has transactions') if transactions.length > 0
  end

  def validate_no_patterns
    errors.add(:patterns, 'Subcategory has patterns') if patterns.length > 0
  end
end
