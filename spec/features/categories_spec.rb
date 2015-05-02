require 'rails_helper'

feature 'Categories and Subcategories', type: :feature do
  before :each do
    income = FactoryGirl.create(:category_type, name: 'Income')
    expense = FactoryGirl.create(:category_type, name: 'Expense')

    @c1 = FactoryGirl.create(:category, category_type: income, name: 'Category One')
    @c2 = FactoryGirl.create(:category, category_type: expense, name: 'Category Two')

    @sc = FactoryGirl.create(:subcategory, category: @c1, name: 'Subcategory One')
  end

  scenario 'User views and edits categories', js: true do
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

    within '.panel', text: 'Income' do
      click_on 'new'
      fill_in 'name', with: 'New Name'
      select 'Income', from: 'category_type_id'
      click_on 'save'
      expect(page).to have_text('New Name')

      page.find('tr', :text => 'New Name').click
      fill_in 'name', with: 'Another New Name'
      select 'Expense', from: 'category_type_id'
      click_on 'save'
    end

    within '.panel', text: 'Expense' do
      expect(page).to have_text('Another New Name')

      page.find('tr', :text => 'Another New Name').click
      click_on 'delete'
      page.driver.browser.switch_to.alert.accept
    end

    expect(page).not_to have_text('Another New Name')
  end

  scenario 'User views and edits categories', js: true do
    visit_categories

    within '.panel', text: 'Income' do
      page.find('tr', :text => 'New...').click
      fill_in 'name', with: 'New Subcategory Name'
      select 'Category One', from: 'category_id'
      click_on 'save'
      expect(page).to have_text('New Subcategory Name')

      page.find('tr', :text => 'New Subcategory Name').click
      fill_in 'name', with: 'Another New Name'
      select 'Category Two', from: 'category_id'
      click_on 'save'
    end

    within '.panel', text: 'Expense' do
      expect(page).to have_text('Another New Name')

      page.find('tr', :text => 'Another New Name').click
      click_on 'delete'
      page.driver.browser.switch_to.alert.accept
    end

    expect(page).not_to have_text('Another New Name')
  end
end
