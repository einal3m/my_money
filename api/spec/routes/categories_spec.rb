require_relative '../../queries/categories_query'
require_relative '../../commands/category_commands'
require_relative '../factories/factory'
require 'rack/test'

RSpec.describe '/categories' do
  include Rack::Test::Methods

  def app
    MyMoney.app
  end

  describe 'GET categories' do
    it 'calls the category query and returns the result' do
      query = instance_double CategoriesQuery
      expect(CategoriesQuery).to receive(:new).and_return(query)
      expect(query).to receive(:execute).and_return(categories: ['one'])

      get '/categories'

      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq('categories' => ['one'])
    end
  end

  describe 'POST create' do
    it 'calls the create category command and returns 201' do
      params = {
        name: 'my category',
        category_type_id: 2
      }
      command = instance_double CategoryCommands
      expect(CategoryCommands).to receive(:new).and_return(command)
      expect(command).to receive(:create).with(params).and_return(11)

      post '/categories', JSON.generate(category: params)

      expect(JSON.parse(last_response.body)).to eq('id' => 11)
      expect(last_response.status).to eq(201)
    end
  end

  describe 'PUT update' do
    it 'calls the update category command and returns 204' do
      category = Factory.create_category
      params = { name: 'updated name' }

      command = instance_double CategoryCommands
      expect(CategoryCommands).to receive(:new).and_return(command)
      expect(command).to receive(:update).with(category, params)

      put "/categories/#{category.id}", JSON.generate(category: params)

      expect(last_response.status).to eq(204)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if category does not exist' do
      expect(CategoryCommands).not_to receive(:new)

      put '/categories/11', category: { 'name' => 'updated name' }

      expect(last_response.status).to eq(404)
    end
  end

  describe 'DELETE categories/:id' do
    it 'calls the delete category command and returns 200' do
      category = Factory.create_category

      command = instance_double CategoryCommands
      expect(CategoryCommands).to receive(:new).and_return(command)
      expect(command).to receive(:delete).with(category)

      delete "/categories/#{category.id}"

      expect(last_response.status).to eq(200)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if category does not exist' do
      expect(CategoryCommands).not_to receive(:new)

      delete '/categories/11'

      expect(last_response.status).to eq(404)
    end
  end
end
