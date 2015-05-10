require 'rails_helper'

feature 'Reports', type: :feature do
  before :each do
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')

    c1 = FactoryGirl.create(:category, name: 'First Category')
    sc = FactoryGirl.create(:subcategory, name: 'First Subcategory', category: c1)
    FactoryGirl.create(:transaction, category: c1, subcategory: sc, date: Date.today, notes: 'First Transaction')
    FactoryGirl.create(:transaction, category: c1, subcategory: nil, date: Date.today, notes: 'Second Transaction')
    FactoryGirl.create(:transaction, category: nil, subcategory: nil, date: Date.today, notes: 'Third Transaction')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User views the categories report', js: true do
    start_my_money
    visit_report 'Category Report'

    expect(page).to have_text('category report')
    expect(page).to have_select('category_id', selected: 'Please select...')
    expect(page).to have_select('date_range_option_id', selected: 'Current Month')

    within('.nav-tabs') do
      expect(page).to have_link('Data')
      expect(page).to have_link('Graph')
    end

    # default, category unassigned
    click_on 'Data'
    within 'tbody' do
      expect(page.all('tr').count).to eq(1)
      expect(page).to have_text('Third Transaction')
    end

    # select a different category
    select 'First Category', from: 'category_id'
    click_on 'search'

    click_on 'Data'
    within 'tbody' do
      expect(page.all('tr').count).to eq(2)
      expect(page).to have_text('First Transaction')
      expect(page).to have_text('Second Transaction')
    end

    # need to check for graph
    # need to add custom date range
  end

  scenario 'User views the sub-categories report', js: true do
    start_my_money
    visit_report 'Subcategory Report'

    expect(page).to have_text('subcategory report')

    # select another subcategory
    select 'First Category', from: 'category_id'
    select 'First Subcategory', from: 'subcategory_id'
    click_on 'search'

    click_on 'Data'
    within 'tbody' do
      expect(page.all('tr').count).to eq(1)
      expect(page).to have_text('First Transaction')
    end

    # need to add check for graph
  end
end
