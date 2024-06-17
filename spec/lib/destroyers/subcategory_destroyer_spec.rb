# frozen_string_literal: true

require 'rails_helper'
require_relative '../../../app/models/destroyers/subcategory_destroyer'

describe SubcategoryDestroyer do
  let!(:subcategory) { FactoryBot.create(:subcategory) }
  let(:destroyer) { described_class.new subcategory }

  it 'deletes a subcategory' do
    expect { destroyer.execute }.to change(Subcategory, :count).by(-1)
    expect { subcategory.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end

  describe 'errors' do
    it 'doesnt delete if subcategory has transactions' do
      FactoryBot.create(:transaction, category: subcategory.category, subcategory:)
      expect do
        destroyer.execute
      end.to raise_error(MyMoneyError, 'Cannot delete a subcategory that has been allocated to transactions')
    end

    it 'doesnt delete if subcategory has patterns' do
      FactoryBot.create(:pattern, subcategory:)
      expect do
        destroyer.execute
      end.to raise_error(MyMoneyError, 'Cannot delete a subcategory that is assigned to patterns')
    end
  end
end
