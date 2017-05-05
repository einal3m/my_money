require_relative '../../commands/subcategory_commands'
require_relative '../../models/subcategory'
require_relative '../factories/factory'

RSpec.describe SubcategoryCommands do
  describe 'create' do
    context 'with valid params' do
      it 'creates the subcategory and returns the id' do
        category = Factory.create_category
        params = {
          name: 'my subcategory',
          category_id: category.id
        }

        id = SubcategoryCommands.new.create(params)

        subcategory = Subcategory.first
        expect(subcategory.id).to eq(id)
        expect(subcategory.name).to eq('my subcategory')
        expect(subcategory.category).to eq(category)
      end
    end

    context 'with invalid params' do
      it 'raises an exception' do
        category = Factory.create_category
        invalid_params = {
          category_id: category.id
        }

        expect do
          SubcategoryCommands.new.create(invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'name is not present')
      end
    end

    context 'when category does not exist' do
      it 'raises an exception' do
        invalid_params = {
          name: 'New Category',
          category_id: 2
        }

        expect do
          SubcategoryCommands.new.create(invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'category not found')
      end
    end
  end

  describe 'update' do
    context 'with valid params' do
      it 'updates the subcategory' do
        subcategory = Factory.create_subcategory
        params = { name: 'new subcategory name' }

        SubcategoryCommands.new.update(subcategory, params)

        updated_subcategory = Subcategory[subcategory.id]
        expect(updated_subcategory.name).to eq('new subcategory name')
      end
    end

    context 'with invalid params' do
      it 'raises an exception' do
        subcategory = Factory.create_subcategory
        invalid_params = { name: nil }

        expect do
          SubcategoryCommands.new.update(subcategory, invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'name is not present')
      end
    end

    context 'when category does not exist' do
      it 'raises an exception' do
        subcategory = Factory.create_subcategory
        invalid_params = {
          name: 'New Category',
          category_id: 12
        }

        expect do
          SubcategoryCommands.new.update(subcategory, invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'category not found')
      end
    end
  end

  describe 'delete' do
    it 'deletes the subcategory' do
      subcategory = Factory.create_subcategory

      SubcategoryCommands.new.delete(subcategory)

      expect(Subcategory[subcategory.id]).to be_nil
    end
  end
end
