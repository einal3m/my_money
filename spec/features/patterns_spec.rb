require 'rails_helper'

feature 'Patterns', type: :feature, js: true do
  before :each do
    # create_accounts
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
    start_my_money
    visit_patterns

    expect(page).to have_select('account_id', selected: 'My First Account')
    expect(page).to have_text('Pattern Spec Match 1')

    select('My Second Account', from: 'account_id')
    expect(page).to have_text('Pattern Spec Match 2')
  end

  scenario 'User creates a new Pattern', js: true do
    start_my_money
    visit_patterns

    pattern_params = {
      match_text: 'My Match Text',
      notes: 'New Note',
      category: 'My Test Category',
      subcategory: 'My Test Subcategory'
    }

    create_pattern(pattern_params)
    verify_pattern(pattern_params)
  end

  scenario 'User deletes a Pattern', js: true do
    start_my_money
    visit_patterns

    delete_pattern('Pattern Spec Match 1')
  end

  scenario 'User edits a pattern', js: true do
    start_my_money
    visit_patterns

    text = 'Pattern Spec Match 1'
    pattern_params = {
      match_text: 'Edit Match Text',
      notes: 'Edit Notes',
      category: 'Another Test Category',
      subcategory: 'Another Test Subcategory'
    }
    edit_pattern(text, pattern_params)
    verify_pattern(pattern_params)
  end
end
