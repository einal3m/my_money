require_relative '../../queries/subcategory_query'
require_relative '../../commands/subcategory_commands'
require_relative '../factories/factory'
require 'rack/test'

RSpec.describe '/subcategories' do
  include Rack::Test::Methods

  def app
    MyMoney.app
  end

  describe 'GET subcategories' do
    it 'calls the subcategory query and returns the result' do
      query = instance_double SubcategoriesQuery
      expect(SubcategoriesQuery).to receive(:new).and_return(query)
      expect(query).to receive(:execute).and_return(subcategories: ['one'])

      get '/subcategories'

      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq('subcategories' => ['one'])
    end
  end

  describe 'POST create' do
    it 'calls the create subcategory command and returns 201' do
      params = {
        name: 'my subcategory',
        subcategory_type_id: 2
      }
      command = instance_double SubcategoryCommands
      expect(SubcategoryCommands).to receive(:new).and_return(command)
      expect(command).to receive(:create).with(params).and_return(11)

      post '/subcategories', JSON.generate(subcategory: params)

      expect(JSON.parse(last_response.body)).to eq('id' => 11)
      expect(last_response.status).to eq(201)
    end
  end

  describe 'PUT update' do
    it 'calls the update subcategory command and returns 204' do
      subcategory = Factory.create_subcategory
      params = { name: 'updated name' }

      command = instance_double SubcategoryCommands
      expect(SubcategoryCommands).to receive(:new).and_return(command)
      expect(command).to receive(:update).with(subcategory, params)

      put "/subcategories/#{subcategory.id}", JSON.generate(subcategory: params)

      expect(last_response.status).to eq(204)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if subcategory does not exist' do
      expect(SubcategoryCommands).not_to receive(:new)

      put '/subcategories/11', subcategory: { 'name' => 'updated name' }

      expect(last_response.status).to eq(404)
    end
  end

  describe 'DELETE subcategories/:id' do
    it 'calls the delete subcategory command and returns 200' do
      subcategory = Factory.create_subcategory

      command = instance_double SubcategoryCommands
      expect(SubcategoryCommands).to receive(:new).and_return(command)
      expect(command).to receive(:delete).with(subcategory)

      delete "/subcategories/#{subcategory.id}"

      expect(last_response.status).to eq(200)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if subcategory does not exist' do
      expect(SubcategoryCommands).not_to receive(:new)

      delete '/subcategories/11'

      expect(last_response.status).to eq(404)
    end
  end
end
