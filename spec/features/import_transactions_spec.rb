require 'rails_helper'

feature 'Import Transactions', type: :feature do
  after :all  do
    DatabaseCleaner.clean
  end

  scenario 'User imports transactions from OFX file', js: true  do
    visit_categories
    create_categories

    visit_accounts
    create_savings_account
    visit_account_transactions 'Account One'

    select_file_to_import('test_v1.ofx')
    set_import_category('MCDONALDS', 'Category One', 'Subcategory One')
    import_transactions

    filter_transactions('Custom Dates', Date.parse('2014-07-01'), Date.parse('2014-07-31'))

    verify_transaction('VILLAGE CINEMA', ['5-Jul-2014', '55.00', '$3,110.15'])
    verify_transaction('COLES SUPERMARKETS', ['4-Jul-2014', '74.76', '$3,165.15'])
    verify_transaction('TARGET', ['3-Jul-2014', '16.99', '$3,239.91'])
    verify_transaction('PAYMENT RECEIVED', ['3-Jul-2014', '3,266.10', '$3,256.90'])
    verify_transaction('MCDONALDS', ['3-Jul-2014', '19.20', '$(9.20)', 'Category One/Subcategory One'])
  end
end
