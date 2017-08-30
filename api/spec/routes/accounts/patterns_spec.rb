require_relative '../../../queries/patterns_query'
require_relative '../../../commands/pattern_commands'
require_relative '../../factories/factory'
require 'rack/test'

RSpec.describe '/accounts/:account_id/patterns' do
  include Rack::Test::Methods

  let(:account) { Factory.create_account }
  let(:category) { Factory.create_category }
  let(:subcategory) { Factory.create_subcategory(category: category) }

  def app
    MyMoney.app
  end

  describe 'GET patterns' do
    it 'calls the patterns query and returns the result' do
      query = instance_double PatternsQuery
      expect(PatternsQuery).to receive(:new).with(account).and_return(query)
      expect(query).to receive(:execute).and_return(patterns: ['one'])

      get "/accounts/#{account.id}/patterns"

      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)).to eq('patterns' => ['one'])
    end
  end

  describe 'POST patterns' do
    it 'calls the create pattern command and returns 201' do
      params = {
        account_id: account.id,
        match_text: 'my text',
        category_id: category.id,
        subcategory_id: subcategory.id,
        notes: 'my notes'
      }

      command = instance_double PatternCommands
      expect(PatternCommands).to receive(:new).and_return(command)
      expect(command).to receive(:create).with(params).and_return(11)

      post "/accounts/#{account.id}/patterns", JSON.generate(pattern: params)

      expect(last_response.status).to eq(201)
      expect(JSON.parse(last_response.body)).to eq('id' => 11)
    end
  end

  describe 'PUT accounts/:account_id/pattern/:id' do
    it 'calls the update budget command and returns 204' do
      pattern = Factory.create_pattern(account: account)
      params = { notes: 'my new note' }

      command = instance_double PatternCommands
      expect(PatternCommands).to receive(:new).and_return(command)
      expect(command).to receive(:update).with(pattern, params)

      put "/accounts/#{account.id}/patterns/#{pattern.id}", JSON.generate(pattern: params)

      expect(last_response.status).to eq(204)
      expect(last_response.body).to eq('')
    end

    it 'returns 404 if budget does not exist' do
      expect(PatternCommands).not_to receive(:new)

      put "/accounts/#{account.id}/patterns/11", JSON.generate(pattern: 'params')

      expect(last_response.status).to eq(404)
    end
  end

  describe 'DELETE accounts/:account_id/pattern/:pattern_id' do
    it 'calls the delete pattern command and returns 200' do
      pattern = Factory.create_pattern

      command = instance_double PatternCommands
      expect(PatternCommands).to receive(:new).and_return(command)
      expect(command).to receive(:delete).with(pattern)

      delete "/accounts/#{account.id}/patterns/#{pattern.id}"

      expect(last_response.status).to eq(200)
      expect(last_response.body).to eq('')
    end
  end
end
