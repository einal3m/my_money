#
#  CategoryType
#
#  id: int, primary key
#  name: string
#
class CategoryType < ActiveRecord::Base
  validates :name, presence: true
  has_many :categories

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
