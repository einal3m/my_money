require_relative '../../commands/category_commands'
require_relative '../../models/category'
require_relative '../factories/factory'

RSpec.describe CategoryCommands do
  describe 'create' do
    context 'with valid params' do
      it 'creates the category and returns the id' do
        params = {
          name: 'my category',
          category_type_id: 2
        }

        id = CategoryCommands.new.create(params)

        category = Category.first
        expect(category.id).to eq(id)
        expect(category.name).to eq('my category')
        expect(category.category_type_id).to eq(2)
      end
    end

    context 'with invalid params' do
      it 'raises an exception' do
        invalid_params = {
          category_type_id: 2
        }

        expect do
          CategoryCommands.new.create(invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'name is not present')
      end
    end
  end

  describe 'update' do
    context 'with valid params' do
      it 'updates the category' do
        category = Factory.create_category
        params = { name: 'new category name' }

        CategoryCommands.new.update(category, params)

        updated_category = Category[category.id]
        expect(updated_category.name).to eq('new category name')
      end
    end

    context 'with invalid params' do
      it 'raises an exception' do
        category = Factory.create_category
        invalid_params = { name: nil }

        expect do
          CategoryCommands.new.update(category, invalid_params)
        end.to raise_error(Sequel::ValidationFailed, 'name is not present')
      end
    end
  end

  describe 'delete' do
    it 'deletes the category' do
      category = Factory.create_category

      CategoryCommands.new.delete(category)

      expect(Category[category.id]).to be_nil
    end
  end
end
