require 'rails_helper'
require 'destroyers/subcategory_destroyer'

describe 'SubcategoryDestroyer' do
  let(:subcategory) { FactoryGirl.create(:subcategory) }
  let(:destroyer) { SubcategoryDestroyer.new subcategory }

  it 'deletes a subcategory' do
    expect(subcategory).to receive(:destroy!)
    destroyer.execute 
  end

  describe 'errors' do
    it 'doesnt delete if subcategory has transactions' do
      FactoryGirl.create(:transaction, category: subcategory.category, subcategory: subcategory)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete a subcategory that has been allocated to transactions')
    end
    
    it 'doesnt delete if subcategory has patterns' do
      FactoryGirl.create(:pattern, subcategory: subcategory)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete a subcategory that is assigned to patterns')
    end
  end
end
