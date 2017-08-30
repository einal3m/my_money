require_relative '../../queries/patterns_query'
# require_relative '../../commands/budget_commands'
require_relative '../factories/factory'
require 'rack/test'

RSpec.describe '/accounts/:account_id/patterns' do
  include Rack::Test::Methods

  let(:account) { Factory.create_account }

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
end

# require 'rails_helper'
#
# RSpec.describe PatternsController, type: :controller do
#   let(:valid_session) { {} }
#
#   xdescribe 'GET index' do
#     it 'returns all patterns for given account' do
#       pattern = FactoryGirl.create(:pattern)
#       get :index, { account_id: pattern.account.id }, valid_session
#
#       json = JSON.parse(response.body)
#       expect(response).to be_success
#       expect(json['patterns'].length).to eq(1)
#       expect(json['patterns'][0]).to eq(serialize_pattern(pattern))
#     end
#   end
#
#   xdescribe 'POST create' do
#     describe 'with valid params' do
#       it 'creates a new Pattern' do
#         account = FactoryGirl.create(:account)
#         expect {
#           post :create, { account_id: account.id, pattern: build_attributes(:pattern) }, valid_session
#         }.to change(Pattern, :count).by(1)
#
#         json = JSON.parse(response.body)
#         expect(response).to be_success
#
#         pattern = Pattern.first
#         expect(json['pattern']).to eq(serialize_pattern(pattern))
#       end
#     end
#
#     describe 'with invalid params' do
#       it 'returns an error and does not create the pattern' do
#         account = FactoryGirl.create(:account)
#         expect {
#           post :create, { account_id: account.id, pattern: build_attributes(:pattern_invalid) }, valid_session
#         }.not_to change(Pattern, :count)
#
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(422)
#         expect(json).to eq('match_text' => ["can't be blank"])
#       end
#     end
#   end
#
#   xdescribe 'PUT update' do
#     context 'with valid params' do
#       it 'updates the requested pattern' do
#         pattern = FactoryGirl.create(:pattern)
#         new_subcategory = FactoryGirl.create(:subcategory)
#         new_category = new_subcategory.category
#
#         put :update, { id: pattern.id, account_id: pattern.account.id, pattern: {
#           match_text: 'New Text',
#           notes: 'New Note',
#           category_id: new_category.id,
#           subcategory_id: new_subcategory.id
#         } }, valid_session
#
#         pattern.reload
#         expect(pattern.match_text).to eq('New Text')
#         expect(pattern.notes).to eq('New Note')
#         expect(pattern.category).to eq(new_category)
#         expect(pattern.subcategory).to eq(new_subcategory)
#
#         json = JSON.parse(response.body)
#         expect(response).to be_success
#         expect(json['pattern']).to eq(serialize_pattern(pattern))
#       end
#     end
#
#     context 'with invalid params' do
#       it 'assigns the pattern as @pattern' do
#         pattern = FactoryGirl.create(:pattern)
#         put :update,
# { id: pattern.id, account_id: pattern.account.id, pattern: build_attributes(:pattern_invalid) }, valid_session
#
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(422)
#         expect(json).to eq('match_text' => ["can't be blank"])
#       end
#     end
#   end
#
#   xdescribe 'DELETE destroy' do
#     it 'destroys the requested pattern' do
#       pattern = FactoryGirl.create(:pattern)
#       expect {
#         delete :destroy, { id: pattern.id, account_id: pattern.account.id }, valid_session
#       }.to change(Pattern, :count).by(-1)
#       expect(response).to be_success
#     end
#   end
# end
