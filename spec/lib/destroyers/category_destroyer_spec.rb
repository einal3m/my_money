# frozen_string_literal: true

require 'rails_helper'
require_relative '../../../app/models/destroyers/category_destroyer'

describe 'CategoryDestroyer' do
  let!(:category) { FactoryBot.create(:category) }
  let(:destroyer) { CategoryDestroyer.new category }

  it 'deletes a category' do
    expect { destroyer.execute }.to change(Category, :count).by(-1)
    expect { category.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end

  describe 'errors' do
    it 'doesnt delete if category has transactions' do
      FactoryBot.create(:transaction, category:)
      expect do
        destroyer.execute
      end.to raise_error(MyMoneyError, 'Cannot delete a category that has been allocated to transactions')
    end

    it 'doesnt delete if category has patterns' do
      FactoryBot.create(:pattern, category:)
      expect { destroyer.execute }.to raise_error(MyMoneyError, 'Cannot delete a category that is assigned to patterns')
    end

    it 'doesnt delete if category has subcategories' do
      FactoryBot.create(:subcategory, category:)
      expect { destroyer.execute }.to raise_error(MyMoneyError, 'Cannot delete a category that has subcategories')
    end
  end
end
