require 'rails_helper'

RSpec.describe DateRangeOption, :type => :model do

  it "has a valid factory" do
    c = FactoryGirl.create(:date_range_option)

    expect(c).to be_valid
    expect(c).to be_a(DateRangeOption)
  end
  
  describe "validations" do

    it "it is invalid without a description" do
    	expect(FactoryGirl.build(:date_range_option, description: nil)).not_to be_valid
    end
    
    it "it is invalid without a klass" do
    	expect(FactoryGirl.build(:date_range_option, klass: nil)).not_to be_valid
    end

    it "it is invalid without an order" do
    	expect(FactoryGirl.build(:date_range_option, order: nil)).not_to be_valid
    end

    it "it is invalid without default set" do
    	expect(FactoryGirl.build(:date_range_option, default: nil)).not_to be_valid
    end

    it "only has instance where default is true" do
    	FactoryGirl.create(:date_range_option, default: true)
    	expect(FactoryGirl.build(:date_range_option, default: true)).not_to be_valid
    end

  end

  describe "scopes" do
  	it "returns the default date range option" do
  		FactoryGirl.create(:date_range_option)
  		default = FactoryGirl.create(:date_range_option, default: true)
  		FactoryGirl.create(:date_range_option)

  		expect(DateRangeOption.default).to eq(default)
  	end
  end

end
