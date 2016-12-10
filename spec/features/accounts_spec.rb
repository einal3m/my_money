require 'rails_helper'

feature 'Accounts', type: :feature do
  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'Account spec', js: true do
    account_spec
  end
end
