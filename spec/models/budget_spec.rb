require 'rails_helper'

RSpec.describe Budget, type: :model do
  it 'has a valid factory' do
    a = FactoryGirl.create(:budget)

    expect(a).to be_valid
    expect(a).to be_a(Budget)
  end

  describe 'validations' do

  end
end
