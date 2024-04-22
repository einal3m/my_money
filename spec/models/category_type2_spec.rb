# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CategoryType2 do
  it 'Transfer' do
    category_type = CategoryType2::Transfer.new
    expect(category_type.id).to eq(1)
    expect(category_type.name).to eq('Transfer')
    expect(category_type).not_to be_editable
  end

  it 'Income' do
    category_type = CategoryType2::Income.new
    expect(category_type.id).to eq(2)
    expect(category_type.name).to eq('Income')
    expect(category_type).to be_editable
  end

  it 'Expense' do
    category_type = CategoryType2::Expense.new
    expect(category_type.id).to eq(3)
    expect(category_type.name).to eq('Expense')
    expect(category_type).to be_editable
  end
end
