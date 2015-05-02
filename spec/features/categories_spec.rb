require 'rails_helper'

feature 'Categories and Subcategories', type: :feature do
  before :each do
    income = FactoryGirl.create(:category_type, name: 'Income')
    expense = FactoryGirl.create(:category_type, name: 'Expense')

    @c1 = FactoryGirl.create(:category, category_type: income, name: 'Category One')
    @c2 = FactoryGirl.create(:category, category_type: expense, name: 'Category Two')

    @sc = FactoryGirl.create(:subcategory, category: @c1, name: 'Subcategory One')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User views categories and subcategories', js: true do
    visit_categories

    expect(page).to have_text('my categories')
    expect(page).to have_text('Income Categories')
    expect(page).to have_text('Expense Categories')

    within '.panel', text: 'Income' do
      expect(page).to have_text('Category One')
      expect(page).to have_text('Subcategory One')
      expect(page).to have_text('New...')
    end

    within '.panel', text: 'Expense' do
      expect(page).to have_text('Category Two')
      expect(page).to have_text('New...')
    end
  end

  scenario 'User edits categories', js: true do
    visit_categories

    within '.panel', text: 'Income' do
      click_on 'new'
      fill_in 'name', with: 'New Name'
      select 'Income', from: 'category_type_id'
      click_on 'save'
      expect(page).to have_text('New Name')

      click_on_row_with_text 'New Name'
      fill_in 'name', with: 'Another New Name'
      select 'Expense', from: 'category_type_id'
      click_on 'save'
    end

    within '.panel', text: 'Expense' do
      expect(page).to have_text('Another New Name')

      click_on_row_with_text 'Another New Name'
      click_on 'delete'
      confirm_alert
    end

    expect(page).not_to have_text('Another New Name')
  end

  scenario 'User edits subcategories', js: true do
    visit_categories

    within '.panel', text: 'Income' do
      click_on_row_with_text 'New...'
      fill_in 'name', with: 'New Subcategory Name'
      select 'Category One', from: 'category_id'
      click_on 'save'
      expect(page).to have_text('New Subcategory Name')

      click_on_row_with_text 'New Subcategory Name'
      fill_in 'name', with: 'Another New Name'
      select 'Category Two', from: 'category_id'
      click_on 'save'
    end

    within '.panel', text: 'Expense' do
      expect(page).to have_text('Another New Name')

      click_on_row_with_text 'Another New Name'
      click_on 'delete'
      confirm_alert
    end

    expect(page).not_to have_text('Another New Name')
  end
end
