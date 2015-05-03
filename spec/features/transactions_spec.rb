require 'rails_helper'

feature 'Transactions', type: :feature do
  before :each do
    # create a few date ranges
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    FactoryGirl.create(:date_range_option, description: 'Last 90 Days', klass: 'Lib::Last90DaysDateRange')

    FactoryGirl.create(:category_type, name: 'Expense')
    @ct_i = FactoryGirl.create(:category_type, name: 'Income')
    c1 = FactoryGirl.create(:category, name: 'First Category', category_type: @ct_i)
    c2 = FactoryGirl.create(:category, name: 'Second Category', category_type: @ct_i)
    FactoryGirl.create(:subcategory, name: 'First Subcategory', category: c1)
    FactoryGirl.create(:subcategory, name: 'Second Subcategory', category: c2)

    a = FactoryGirl.create(:account, name: 'My New Account')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: 'First Transaction')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: 'Second Transaction')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: 'Third Transaction')
    FactoryGirl.create(:transaction, account: a, date: Date.today << 1, notes: 'Fourth Transaction')
    FactoryGirl.create(:transaction, account: a, date: Date.today << 2, notes: 'Fifth Transaction')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User views the transaction list for an account', js: true  do
    visit_accounts
    click_on 'My New Account'

    expect(page).to have_text('my transactions')
    expect(page).to have_text('First Transaction')
    expect(page).to have_text('Second Transaction')
    expect(page).to have_text('Third Transaction')
    expect(page).not_to have_text('Fourth Transaction')
    expect(page).not_to have_text('Fifth Transaction')
  end

  scenario 'User creates a new transaction', js: true  do
    date_text = Date.today.strftime('%-d-%b-%Y')

    visit_accounts
    click_on 'My New Account'

    expect(page).to have_text('my transactions')
    expect(page.all('tbody tr').count).to eq(3)
    click_on 'new'

    expect(page).to have_button('save')
    expect(page).to have_button('cancel')

    click_on 'cancel'
    expect(page).not_to have_button('save')
    expect(page).not_to have_button('cancel')

    click_on 'new'
    fill_in 'date', with: date_text
    fill_in 'notes', with: 'Sixth Transaction'
    fill_in 'amount', with: 50.00
    select 'First Category', from: 'category_id'
    select 'First Subcategory', from: 'subcategory_id'
    click_on 'save'

    expect(page.all('tbody tr').count).to eq(4)
    within 'tr', text: 'Sixth Transaction' do
      expect(page).to have_text('50.00')
      expect(page).to have_text(date_text)
      expect(page).to have_text('First Category/First Subcategory')
    end
  end

  scenario 'User edits a transaction', js: true  do
    visit_accounts
    click_on('My New Account')

    expect(page).to have_text('my transactions')

    click_on_row_with_text 'First Transaction'
    within 'tbody' do
      expect(page).to have_selector('.form-horizontal')
    end

    click_on('cancel')
    within 'tbody' do
      expect(page).not_to have_selector('.form-horizontal')
    end

    click_on_row_with_text 'First Transaction'
    edit_date_text = (Date.today - 1.day).strftime('%-d-%b-%Y')
    fill_in 'notes', with: 'Edit Transaction'
    fill_in 'date', with: edit_date_text
    fill_in 'amount', with: 50.00
    select 'Second Category', from: 'category_id'
    select 'Second Subcategory', from: 'subcategory_id'
    click_on 'save'

    within 'tr', text: 'Edit Transaction' do
      expect(page).to have_text('50.00')
      expect(page).to have_text(edit_date_text)
      expect(page).to have_text('Second Category/Second Subcategory')
    end
  end
end
