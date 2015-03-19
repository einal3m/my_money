require 'rails_helper'

RSpec.describe DateRangeOption, type: :model do
  it 'has a valid factory' do
    c = FactoryGirl.create(:date_range_option)

    expect(c).to be_valid
    expect(c).to be_a(DateRangeOption)
  end

  describe 'validations' do
    it 'is invalid without a description' do
      expect(FactoryGirl.build(:date_range_option, description: nil)).not_to be_valid
    end

    it 'is invalid without a klass' do
      expect(FactoryGirl.build(:date_range_option, klass: nil)).not_to be_valid
    end

    it 'is invalid if klass does not exist, or is not of type DateRange' do
      expect(FactoryGirl.build(:date_range_option, klass: 'Object')).not_to be_valid
    end
  end

  describe 'scopes' do
    it 'returns the default date range option' do
      default = FactoryGirl.create(:date_range_option)
      FactoryGirl.create(:date_range_option)
      FactoryGirl.create(:date_range_option)

      expect(DateRangeOption.default_option).to eq(default)
    end
  end

  describe 'callbacks on create' do
    it 'sets default to true for the first intance created' do
      dro1 = FactoryGirl.create(:date_range_option)
      dro2 = FactoryGirl.create(:date_range_option)

      expect(dro1.default).to be_truthy
      expect(dro2.default).to be_falsey
    end

    it 'sets order to next number in sequence' do
      dro1 = FactoryGirl.create(:date_range_option)
      dro2 = FactoryGirl.create(:date_range_option)

      expect(dro1.order).to be(1)
      expect(dro2.order).to be(2)
    end

    it 'creates and populates date range object' do
      dro1 = FactoryGirl.create(:date_range_option, klass: 'Lib::CurrentMonthDateRange')
      expect(dro1.date_range).to be_a(Lib::CurrentMonthDateRange)
    end
  end

  describe 'callbacks on update default' do
    it 'sets the default attribute to true, and the record currently default to false' do
      dro1 = FactoryGirl.create(:date_range_option)
      dro2 = FactoryGirl.create(:date_range_option)
      dro3 = FactoryGirl.create(:date_range_option)

      dro2.update(default: true)

      dro1.reload
      dro2.reload
      dro3.reload

      expect(dro1.default).to be_falsey
      expect(dro2.default).to be_truthy
      expect(dro3.default).to be_falsey
    end

    it 'sets the default attribute to true when there is no default' do
      dro1 = FactoryGirl.create(:date_range_option)
      dro2 = FactoryGirl.create(:date_range_option)

      dro1.update(default: false)
      dro1.reload
      expect(dro1.default).to be_falsey
      expect(dro2.default).to be_falsey

      dro2.update(default: true)

      dro1.reload
      dro2.reload

      expect(dro1.default).to be_falsey
      expect(dro2.default).to be_truthy
    end
  end
end
