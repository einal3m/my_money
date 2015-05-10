require 'rails_helper'

feature 'DateRangeOptions', type: :feature do
  before :each do
    FactoryGirl.create(:date_range_option, description: 'First Date Range', klass: 'Lib::CurrentMonthDateRange')
    FactoryGirl.create(:date_range_option, description: 'Second Date Range', klass: 'Lib::Last90DaysDateRange')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  xscenario 'User views the date range options' do
    visit_date_range_options

    within 'tr', text: 'First Date Range' do
      expect(page).to have_text('true')
    end
    within 'tr', text: 'Second Date Range' do
      expect(page).to have_text('false')
    end

    expect(page).to have_selector('form#new_date_range_option')
  end

  xscenario 'User adds a new date range option' do
    visit_date_range_options

    click_on '+ New'
    fill_in 'date_range_option_description', with: 'New Date Range'
    fill_in 'date_range_option_klass', with: 'Lib::Last90DaysDateRange'
    click_on 'Save'

    within 'tr', text: 'New Date Range' do
      expect(page).to have_text('Lib::Last90DaysDateRange')
      expect(page).to have_text('false')
    end
    expect(page).to have_text('successfully created')
  end

  xscenario 'user updates a date range option' do
    visit_date_range_options

    within 'tr', text: 'Second Date Range'  do
      find('a').click
    end

    expect(page).to have_text('edit date range option')
    expect(find_field('date_range_option_description').value).to eq('Second Date Range')
    expect(find_field('date_range_option_klass').value).to eq('Lib::Last90DaysDateRange')

    fill_in 'date_range_option_description', with: 'New Date Range'
    fill_in 'date_range_option_klass', with: 'Lib::CustomDateRange'
    check 'date_range_option_default'
    click_on 'Save'

    expect(page).to have_text('date range options')
    within 'tr', text: 'New Date Range' do
      expect(page).to have_text('Lib::CustomDateRange')
      expect(page).to have_content('true')
    end

    within 'tr', text: 'First Date Range' do
      expect(page).to have_content('false')
    end

    expect(page).to have_text('successfully updated')
  end

  xscenario 'User deletes a date range option', js: true do
    visit_date_range_options

    within('tr', text: 'First Date Range') do
      find('a').click
    end

    expect(page).not_to have_button('Delete')

    click_on('Cancel')
    within('tr', text: 'Second Date Range') do
      find('a').click
    end

    click_on('Delete')
    confirm_alert

    expect(page).to have_text('date range options')
    expect(page).not_to have_text('Second Date Range')
    expect(page).to have_text('successfully deleted')
  end
end
