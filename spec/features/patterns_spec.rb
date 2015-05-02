require 'rails_helper'

feature 'Patterns', type: :feature, js: true do
  before :each do
    a1 = FactoryGirl.create(:account, name: 'My First Account')
    FactoryGirl.create(:pattern, account: a1, match_text: 'Pattern Spec Match 1')
    a2 = FactoryGirl.create(:account, name: 'My Second Account')
    FactoryGirl.create(:pattern, account: a2, match_text: 'Pattern Spec Match 2')
    c1 = FactoryGirl.create(:category, name: 'My Test Category')
    FactoryGirl.create(:subcategory, name: 'My Test Subcategory', category: c1)
    c2 = FactoryGirl.create(:category, name: 'Another Test Category')
    FactoryGirl.create(:subcategory, name: 'Another Test Subcategory', category: c2)
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User views the patterns list for an account' do
    visit_patterns

    expect(page).to have_select('account_id', selected: 'My First Account')
    expect(page).to have_text('Pattern Spec Match 1')

    select('My Second Account', from: 'account_id')
    expect(page).to have_text('Pattern Spec Match 2')
  end

  scenario 'User creates a new Pattern', js: true do
    visit_patterns
    click_on 'new'

    expect(page).to have_selector('.form-horizontal')

    fill_in 'match_text', with: 'My Match Text'
    fill_in 'notes', with: 'New Note'
    select 'My Test Category', from: 'category_id'
    select 'My Test Subcategory', from: 'subcategory_id'

    click_on 'save'

    expect(page).to have_text('My Match Text')
    expect(page).to have_text('New Note')
  end

  scenario 'User deletes a Pattern', js: true do
    visit_patterns

    click_on_row_with_text 'Pattern Spec Match 1'
    expect(page).to have_selector('.form-horizontal')

    click_on 'delete'
    confirm_alert

    expect(page).not_to have_text('Pattern Spec Match 1')
  end

  scenario 'User edits a pattern', js: true do
    visit_patterns

    click_on_row_with_text 'Pattern Spec Match 1'
    expect(page).to have_selector('.form-horizontal')

    fill_in 'match_text', with: 'New Match Text'
    fill_in 'notes', with: 'New Notes'
    select 'Another Test Category', from: 'category_id'
    select 'Another Test Subcategory', from: 'subcategory_id'

    click_on 'save'

    within 'tr', text: 'New Match Text' do
      expect(page).to have_text('New Notes')
      expect(page).to have_text('Another Test Category')
      expect(page).to have_text('Another Test Subcategory')
    end
  end
end
