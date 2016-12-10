require 'rails_helper'

feature 'Categories and Subcategories', type: :feature do
  after :all do
    DatabaseCleaner.clean
  end

  scenario 'Category spec', js: true do
    category_spec
  end
end
