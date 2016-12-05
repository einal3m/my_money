require 'rails_helper'

feature 'Patterns', type: :feature do
  let(:c1) { { name: 'First Category', category_type: 'Income' } }
  let(:c2) { { name: 'Second Category', category_type: 'Expense' } }
  let(:s1) { { name: 'First Subcategory', category_type: 'Income', category: 'First Category' } }
  let(:s2) { { name: 'Second Subcategory', category_type: 'Expense', category: 'Second Category' } }

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User creates, edits and deletes a pattern for a savings account', js: true  do
    visit_categories
    create_category(c1)
    create_category(c2)
    create_subcategory(s1)
    create_subcategory(s2)

    visit_accounts
    create_account 'Savings', {
      name: 'My New Account',
      bank: 'My Bank',
      starting_balance: '10',
      starting_date: format_date(Date.today)
    }

    visit_patterns

    pattern_params = {
      match_text: 'My Match Text',
      notes: 'New Note',
      category: 'First Category',
      subcategory: 'First Subcategory'
    }
    create_pattern(pattern_params)
    verify_pattern(pattern_params)

    edited_pattern_params = {
      match_text: 'My Edited Match Text',
      notes: 'Edited Note',
      category: 'Second Category',
      subcategory: 'Second Subcategory'
    }
    edit_pattern('My Match Text', edited_pattern_params)
    verify_pattern(edited_pattern_params)

    delete_pattern('My Edited Match Text')
    verify_pattern_deleted('My Edited Match Text');
  end
end
