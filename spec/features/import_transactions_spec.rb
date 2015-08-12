require 'rails_helper'

feature 'Import Transactions', type: :feature do
  before :each do
    FactoryGirl.create(:category_type, name: 'Expense')
    @ct_i = FactoryGirl.create(:category_type, name: 'Income')
  end

  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User imports transactions from OFX file', js: true  do
    file_name = 'test.ofx'
    start_my_money
    visit_accounts
    create_account 'Savings', name: 'My New Account', starting_balance: '10'
    visit_account_transactions 'My New Account'

    click_on 'import'
    expect(page).to have_text('Step 1 of 2')

    page.execute_script('$("[type=file]").removeClass("hidden")')
    page.attach_file('file_name', File.expand_path("spec/fixtures/#{file_name}"))

    click_on 'Upload'
    wait_for_ajax
    expect(page).to have_text('Step 2 of 2')

    click_on 'Import'
    wait_for_ajax

    filter_transactions('Custom Dates', '01-Jul-2014', '31-Jul-2014')
    wait_for_ajax

    verify_transaction('VILLAGE CINEMA', ['5-Jul-2014', '55.00', '$3,110.15'])
    verify_transaction('COLES SUPERMARKETS', ['4-Jul-2014', '74.76', '$3,165.15'])
    verify_transaction('TARGET', ['3-Jul-2014', '16.99', '$3,239.91'])
    verify_transaction('PAYMENT RECEIVED', ['3-Jul-2014', '3,266.10', '$3,256.90'])
    verify_transaction('MCDONALDS', ['3-Jul-2014', '19.20', '$(9.20)'])
  end
end
