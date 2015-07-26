require 'rails_helper'
require 'destroyers/category_destroyer'

describe 'CategoryDestroyer' do
  let(:category) { FactoryGirl.create(:category) }
  let(:destroyer) { CategoryDestroyer.new category }

  it 'deletes a category' do
    expect(category).to receive(:destroy!)
    destroyer.execute 
  end

  describe 'errors' do
    it 'doesnt delete if category has transactions' do
      FactoryGirl.create(:transaction, category: category)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete a category that has been allocated to transactions')
    end
    
    it 'doesnt delete if category has patterns' do
      FactoryGirl.create(:pattern, category: category)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete a category that is assigned to patterns')
    end
    
    it 'doesnt delete if category has subcategories' do
      FactoryGirl.create(:subcategory, category: category)
      expect{destroyer.execute}.to raise_error(MyMoneyError, 'Cannot delete a category that has subcategories')
    end
  end
end
