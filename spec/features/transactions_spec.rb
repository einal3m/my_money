require 'rails_helper'

feature 'Transactions', :type => :feature do
  before(:each) {
    # create a few date ranges
    FactoryGirl.create(:date_range_option, description: 'Current Month', klass: 'Lib::CurrentMonthDateRange', default: true)
    FactoryGirl.create(:date_range_option, description: 'Custom Dates', klass: 'Lib::CustomDateRange')
    FactoryGirl.create(:date_range_option, description: 'Last 90 Days', klass: 'Lib::Last90DaysDateRange')
    FactoryGirl.create(:category_type, name: 'Expense')
    @ct_i = FactoryGirl.create(:category_type, name: 'Income')
  }

  scenario 'User views the transaction list for an account', :js => true  do
    # given I have an account with some transactions
    a = FactoryGirl.create(:account, name: 'My New Account')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: 'one')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: 'two')
    FactoryGirl.create(:transaction, account: a, date: Date.today, notes: 'three')
    FactoryGirl.create(:transaction, account: a, date: Date.today << 1, notes: 'four')
    FactoryGirl.create(:transaction, account: a, date: Date.today << 2, notes: 'five')

    # when I go to accounts transactions page
    visit '/my_money'
    click_on('My New Account')

    # then I should see a list of transactions
    expect(page).to have_text('my transactions')
    expect(page).to have_text('one')
    expect(page).to have_text('two')
    expect(page).to have_text('three')
    expect(page).to have_text('four')
    expect(page).to have_text('five')
  end

  scenario 'User creates a new transaction', :js => true  do
    FactoryGirl.create(:account, name: 'My New Account')
    date_text = Date.today.strftime('%d-%b-%Y')

    visit('/my_money')
    click_on('My New Account')

    expect(page).to have_text('my transactions')
    expect(page.all('tbody tr').count).to eq(0)
    click_on('new')

    expect(page).to have_button('save')
    expect(page).to have_button('cancel')

    click_on('cancel')
    expect(page).not_to have_button('save')
    expect(page).not_to have_button('cancel')

    click_on('new')
    fill_in('date', with: date_text)
    fill_in('amount', with: 50.00)
    click_on('save')

    expect(page.find('tbody')).to have_selector('tr')
    expect(page.all('tbody tr').count).to eq(1)
    within('tr', :text => '50.00') do
      expect(page).to have_text('50.00')
      expect(page).to have_text(date_text)
    end
  end

  scenario 'User edits a transaction', :js => true  do
    a = FactoryGirl.create(:account, name: 'My New Account')
    FactoryGirl.create(:category, name: 'My Category', category_type: @ct_i)
    c = FactoryGirl.create(:category, name: 'My Edit Category', category_type: @ct_i)
    FactoryGirl.create(:subcategory, name: 'My Edit Subcategory', category: c)
    FactoryGirl.create(
      :transaction,
      account: a,
      date: Date.today,
      notes: 'Edit Transaction'
    )
    visit('/my_money')
    click_on('My New Account')

    expect(page).to have_text('my transactions')
    expect(page.find('tbody')).to have_selector('tr')
    within('tr', :text => 'Edit Transaction') do
      find('.fa-edit').click
    end

    expect(page).to have_button('save')
    expect(page).to have_button('cancel')

    click_on('cancel')
    expect(page).not_to have_button('save')
    expect(page).not_to have_button('cancel')

    within('tr', :text => 'Edit Transaction') do
      find('.fa-edit').click
    end
    edit_date_text = (Date.today - 1.day).strftime('%d-%b-%Y')
    fill_in('date', with: edit_date_text)
    fill_in('amount', with: 50.00)
    select('My Edit Category', from: 'category_id')
    select('My Edit Subcategory', from: 'subcategory_id')
    click_on('save')

    expect(page.find('tbody')).to have_selector('tr')
    expect(page.all('tbody tr').count).to eq(1)

    within('tr', :text => 'Edit Transaction') do
      expect(page).to have_text('50.00')
      expect(page).to have_text(edit_date_text)
      expect(page).to have_text('My Edit Category/My Edit Subcategory')
    end
  end
end
