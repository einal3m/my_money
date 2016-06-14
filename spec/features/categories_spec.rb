require 'rails_helper'

feature 'Categories and Subcategories', type: :feature do
  let(:c1) { { name: 'Category One', category_type: 'Income' } }
  let(:c2) { { name: 'Category Two', category_type: 'Expense' } }
  let(:s1) { { name: 'Subcategory One', category_type: 'Income', category: 'Category One' } }

  before :each do
    visit_categories
  end

  after :all do
    DatabaseCleaner.clean
  end

  scenario 'User creates and deletes categories and subcategories', js: true do
    create_category(c1)
    verify_category(c1)
    create_category(c2)
    verify_category(c2)
    create_subcategory(s1)
    verify_subcategory(s1)

    delete_subcategory(s1)
    verify_subcategory_deleted(s1)
    delete_category(c1)
    verify_category_deleted(c1)
    delete_category(c2)
    verify_category_deleted(c2)
  end

  scenario 'User edits a category', js: true do
    create_category(c1)
    edit_category(c1[:name], 'New Category Name')

    verify_category({name: 'New Category Name', category_type: 'Income'})
  end

  scenario 'User edits a subcategory', js: true do
    create_category(c1)
    create_subcategory(s1)
    edit_subcategory(s1[:name], 'New Subcategory Name')
    verify_subcategory({name: 'New Subcategory Name', category: s1[:category], category_type: 'Income'})
  end
end
