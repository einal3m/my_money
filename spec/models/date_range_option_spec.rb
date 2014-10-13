require 'rails_helper'

RSpec.describe DateRangeOption, :type => :model do

  it "has a valid factory" do
    c = FactoryGirl.create(:date_range_option)

    expect(c).to be_valid
    expect(c).to be_a(DateRangeOption)
  end
  
end
