# frozen_string_literal: true

#
#  Pattern
#
#  id: int, primary key
#  account_id: int, foreign key
#  match_text: string
#  category_id: int, foreign key
#  subcategory_id: int foreign key
#
class Pattern < ApplicationRecord
  # model relationships
  belongs_to :account
  belongs_to :category
  belongs_to :subcategory

  # validations
  validates :match_text, presence: true
end
